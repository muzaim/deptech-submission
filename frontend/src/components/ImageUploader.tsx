// components/ImageUploader.tsx
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  error?: string;
  defaultImage?: string; // << Tambahkan ini
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  error,
  defaultImage,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreviewUrl(defaultImage);
    }
  }, [defaultImage]);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onFileSelect(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition hover:border-primary"
      >
        {previewUrl ? (
          <Image
            width={500}
            height={500}
            src={previewUrl}
            alt="Preview"
            className="h-500 w-500 rounded-md object-cover"
          />
        ) : (
          <p className="text-gray-500 dark:text-white">
            Drag & drop image here or click to upload
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default ImageUploader;
