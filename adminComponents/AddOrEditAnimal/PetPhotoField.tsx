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
const cropToDataUrl = async (src: string, area: Area): Promise<string> => {
  const img = await loadImage(src);
  const scale = Math.min(1, MAX_OUTPUT_WIDTH / area.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(area.width * scale));
  canvas.height = Math.max(1, Math.round(area.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not read that image");
  }
  context.drawImage(
    img,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    canvas.width,
    canvas.height
  );
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
  const [error, setError] = useState("");
  //Bakes can finish out of order while dragging; only the newest one counts.
  const bakeCounter = useRef(0);

  const startCropping = (nextSource: string) => {
    setError("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setSource(nextSource);
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
            onClick={() => startCropping(image)}
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
                aspect={ASPECT}
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
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
              Drag the photo to move it &#8212; pinch or use the slider to zoom.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setZoom(Math.max(1, zoom - 0.25))}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
              >
                <Icon icon="akar-icons:minus" width="14" />
              </button>
              <input
                type="range"
                aria-label="Zoom"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-brand"
              />
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:border-brand hover:text-brand"
              >
                <Icon icon="akar-icons:plus" width="14" />
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
