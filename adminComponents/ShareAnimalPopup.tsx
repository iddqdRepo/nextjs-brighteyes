import React, { useState } from "react";
import QRCode from "react-qr-code";

//Share popup for an animal's public page: copy the link for pasting into
//Facebook, use the phone's native share sheet, or scan/print the QR code.
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

  return (
    <div className="fixed z-50 flex items-center justify-center w-full h-full bg-opacity-50 bg-slate-600">
      <div className="flex flex-col items-center p-6 bg-white border-2 shadow-lg h-fit w-96">
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

        <div className="flex mt-4">
          <button
            onClick={handleCopy}
            className="px-4 py-2 mr-2 text-sm text-white rounded-lg bg-[#8b3479] hover:bg-[#398092] font-poppins"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          {typeof navigator !== "undefined" && !!navigator.share && (
            <button
              onClick={handleShare}
              className="px-4 py-2 text-sm text-white rounded-lg bg-[#8b3479] hover:bg-[#398092] font-poppins"
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
