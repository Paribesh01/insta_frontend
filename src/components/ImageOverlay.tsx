import { X } from "lucide-react";

interface ImageOverlayProps {
  imageUrl: string;
  onClose: () => void;
}

export function ImageOverlay({ imageUrl, onClose }: ImageOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X className="h-8 w-8" />
        </button>
        <img
          src={imageUrl}
          alt="Full size post"
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}
