import { useState } from "react";
import { ImageOverlay } from "./ImageOverlay";

export default function PostGrid({ posts }: { posts: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const openOverlay = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post, index) => (
        <div
          onClick={() => openOverlay(post)}
          key={index}
          className="aspect-square"
        >
          <img
            src={post}
            alt={`Post ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {selectedImage && (
        <ImageOverlay imageUrl={selectedImage} onClose={closeOverlay} />
      )}
    </div>
  );
}
