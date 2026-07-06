import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Icon } from "@iconify/react";

//Share popup for an animal's public page: post straight to Facebook, copy
//the link, use the phone's native share sheet, or scan/print the QR code.
const ShareAnimalPopup = ({
  name,
  url,
  onClose,
}: {
  name: string;
  url: string;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      //Clipboard access can be unavailable (older browsers, http); the
      //visible URL below can still be copied by hand.
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: `Adopt ${name}`, url });
    } catch {
      //The user closed the share sheet.
    }
  };

  //Facebook's share dialog only needs the URL — Facebook's crawler fetches
  //the page's Open Graph tags for the photo and description, which is why
  //the preview only appears for the live site (it can't reach localhost).
  //`quote` pre-fills the post text where supported. No SDK, no API key.
  const handleFacebook = () => {
    const quote = `Could you give ${name} a loving home?`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(quote)}`,
      "_blank",
      "noopener,noreferrer,width=626,height=436"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-slate-600 p-4">
      <div className="flex h-fit w-full max-w-sm flex-col items-center rounded-2xl border-2 bg-white p-6 shadow-lg">
        <div className="text-lg font-roboto">
          Share <span className="font-semibold">{name}</span>
        </div>

        <div className="p-3 mt-4 bg-white border rounded-lg">
          <QRCode value={url} size={160} aria-label={`QR code for ${name}`} />
        </div>

        <div
          id="share-url"
          className="w-full p-2 mt-4 text-xs text-center break-all border rounded font-roboto"
        >
          {url}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            id="share-facebook"
            onClick={handleFacebook}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-white rounded-lg bg-[#1877F2] hover:bg-[#0f65d0] font-poppins"
          >
            <Icon icon="mdi:facebook" width="17" height="17" />
            Share to Facebook
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 text-sm text-white rounded-lg bg-brand hover:bg-brand-dark font-poppins"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          {typeof navigator !== "undefined" && !!navigator.share && (
            <button
              onClick={handleShare}
              className="px-4 py-2 text-sm text-white rounded-lg bg-brand hover:bg-brand-dark font-poppins"
            >
              Share&hellip;
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 underline font-poppins"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareAnimalPopup;
