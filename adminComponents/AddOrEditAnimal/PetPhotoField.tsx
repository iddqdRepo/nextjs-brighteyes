import React, { useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { Icon } from "@iconify/react";
import { PetPhoto } from "../../components/LayoutComponents/AdoptionLayout/AdoptionLayoutComponents";

//The crop frame and the saved photo share this shape, so what the admin sees
//in the frame is what visitors see on the website.
const ASPECT = 4 / 3;
const MAX_OUTPUT_WIDTH = 1200;
const JPEG_QUALITY = 0.85;

type Area = { x: number; y: number; width: number; height: number };

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement("img");
    //Cloudinary allows cross-origin reads, so an existing photo can be
    //re-positioned without re-uploading it.
    if (/^https?:/.test(src)) {
      img.crossOrigin = "anonymous";
    }
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not read that image"));
    img.src = src;
  });

//Draws the selected area onto a canvas and returns it as an inline JPEG,
//shrunk to a sensible upload size. The API sends it on to Cloudinary.
//When the admin zooms out past the photo's edge, the empty space is filled
//with a soft blurred copy of the photo — the same look the website's
//PetPhoto frames use — instead of black bars.
const cropToDataUrl = async (src: string, area: Area): Promise<string> => {
  const img = await loadImage(src);
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const scale = Math.min(1, MAX_OUTPUT_WIDTH / area.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(area.width * scale));
  canvas.height = Math.max(1, Math.round(area.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not read that image");
  }

  const spillsOutside =
    area.x < 0 ||
    area.y < 0 ||
    area.x + area.width > imgWidth ||
    area.y + area.height > imgHeight;
  if (spillsOutside) {
    //Cheap universal blur: shrink the photo to a few pixels, then stretch it
    //back up to cover the canvas (works on every browser, no ctx.filter).
    const tiny = document.createElement("canvas");
    tiny.width = 16;
    tiny.height = Math.max(1, Math.round((16 * canvas.height) / canvas.width));
    const tinyContext = tiny.getContext("2d");
    if (tinyContext) {
      const cover = Math.max(tiny.width / imgWidth, tiny.height / imgHeight);
      tinyContext.drawImage(
        img,
        (tiny.width - imgWidth * cover) / 2,
        (tiny.height - imgHeight * cover) / 2,
        imgWidth * cover,
        imgHeight * cover
      );
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(tiny, 0, 0, canvas.width, canvas.height);
    }
  }

  //The sharp part: only the slice of the crop area the photo actually covers.
  const left = Math.max(0, area.x);
  const top = Math.max(0, area.y);
  const right = Math.min(imgWidth, area.x + area.width);
  const bottom = Math.min(imgHeight, area.y + area.height);
  if (right > left && bottom > top) {
    context.drawImage(
      img,
      left,
      top,
      right - left,
      bottom - top,
      (left - area.x) * scale,
      (top - area.y) * scale,
      (right - left) * scale,
      (bottom - top) * scale
    );
  }
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
};

//WhatsApp-style photo picker: choose a photo, then drag / pinch / zoom it
//inside a frame until the animal sits nicely. The frame is baked into the
//saved image, and a live preview card shows exactly how the website card
//will look.
export const PetPhotoField = ({
  image,
  petName,
  onImageChange,
}: {
  //Current form value: an existing photo URL (edit) or a baked crop.
  image: string;
  petName?: string;
  //Called with the freshly baked crop as a data URL.
  onImageChange: React.Dispatch<string>;
}) => {
  const [source, setSource] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  //How far out the zoom may go: 1 for photos that match the frame, lower for
  //tall or wide photos so the whole photo can fit inside the frame.
  const [minZoom, setMinZoom] = useState(1);
  const [error, setError] = useState("");
  //Bakes can finish out of order while dragging; only the newest one counts.
  const bakeCounter = useRef(0);
  //What the form held before adjusting started, so Cancel can put it back.
  const preCropImage = useRef("");
  //When re-adjusting the saved photo, nothing is baked until the user
  //actually moves or zooms: react-easy-crop emits a crop on load, and baking
  //that would recompress (and later re-upload) an untouched photo.
  const adjustingExisting = useRef(false);
  const interacted = useRef(false);

  const startCropping = (nextSource: string, isExisting = false) => {
    preCropImage.current = image;
    adjustingExisting.current = isExisting;
    interacted.current = false;
    setError("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMinZoom(1);
    setSource(nextSource);
  };

  const changeZoom = (nextZoom: number) => {
    if (nextZoom !== zoom) {
      interacted.current = true;
    }
    setZoom(nextZoom);
  };

  const finishCropping = () => {
    setSource("");
  };

  const cancelCropping = () => {
    //Invalidate any bake still in flight, then restore the previous photo.
    bakeCounter.current += 1;
    onImageChange(preCropImage.current);
    setSource("");
  };

  const handleFile = (file: File | undefined) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => startCropping(String(reader.result));
    reader.onerror = () =>
      setError("Could not read that photo. Please try a different one.");
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (_: Area, areaPixels: Area) => {
    if (adjustingExisting.current && !interacted.current) {
      //Opened but not touched: keep the original photo exactly as it is.
      return;
    }
    const bakeId = ++bakeCounter.current;
    try {
      const baked = await cropToDataUrl(source, areaPixels);
      if (bakeId === bakeCounter.current) {
        onImageChange(baked);
      }
    } catch {
      if (bakeId === bakeCounter.current) {
        setError(
          "Could not adjust that photo. Please upload it again from your device."
        );
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label
          htmlFor="file"
          className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins"
        >
          <Icon icon="carbon:camera" width="16" height="16" />
          {image || source ? "Choose a different photo" : "Upload a photo"}
        </label>
        <input
          className="hidden"
          type="file"
          id="file"
          accept="image/*"
          name="image"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            //Allow re-selecting the same file after "choose a different photo".
            e.target.value = "";
          }}
        />
        {!source && image && (
          <button
            type="button"
            onClick={() => startCropping(image, true)}
            className="flex items-center gap-2 rounded-full border-2 border-brand px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand-50 font-poppins"
          >
            <Icon icon="carbon:move" width="16" height="16" />
            Adjust current photo
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-poppins">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)]">
        {source && (
          <div>
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-900 sm:h-72">
              <Cropper
                image={source}
                crop={crop}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={3}
                aspect={ASPECT}
                showGrid={false}
                restrictPosition={zoom >= 1}
                onMediaLoaded={(mediaSize: {
                  naturalWidth: number;
                  naturalHeight: number;
                }) => {
                  //Let the photo zoom out until it fits entirely inside the
                  //frame (the gap gets a soft blur fill, like the website).
                  const imageAspect =
                    mediaSize.naturalWidth / mediaSize.naturalHeight;
                  const containZoom =
                    imageAspect > ASPECT
                      ? ASPECT / imageAspect
                      : imageAspect / ASPECT;
                  setMinZoom(Math.min(1, Math.max(0.2, containZoom)));
                }}
                onCropChange={(nextCrop) => {
                  if (nextCrop.x !== crop.x || nextCrop.y !== crop.y) {
                    interacted.current = true;
                  }
                  setCrop(nextCrop);
                }}
                onZoomChange={changeZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-600 font-poppins">
              <Icon
                className="mr-1 inline"
                icon="carbon:move"
                inline={true}
                width="13"
              />
              Drag the photo to move it. Zoom out to fit the whole photo in
              &#8212; the gaps fill with a soft blur.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => changeZoom(Math.max(minZoom, zoom - 0.25))}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
              >
                <Icon icon="akar-icons:minus" width="14" />
              </button>
              <input
                type="range"
                aria-label="Zoom"
                min={minZoom}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => changeZoom(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => changeZoom(Math.min(3, zoom + 0.25))}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
              >
                <Icon icon="akar-icons:plus" width="14" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={finishCropping}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark font-poppins sm:flex-none"
              >
                <Icon icon="charm:circle-tick" width="15" />
                Done
              </button>
              <button
                type="button"
                onClick={cancelCropping}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 font-poppins sm:flex-none"
              >
                <Icon icon="akar-icons:cross" width="13" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {image && (
          <div className={source ? "" : "lg:col-span-2"}>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 font-poppins">
              How it will look on the website
            </div>
            <div className="w-full max-w-[16rem] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
              <PetPhoto image={image} className="h-52 w-full" />
              <div className="p-4">
                <div className="text-lg font-semibold text-gray-900 font-poppins">
                  {petName || "Your animal"}
                </div>
                <span className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border-2 border-brand py-2 text-sm font-medium text-brand font-poppins">
                  Meet {petName || "them"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
