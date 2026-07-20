import type { ComponentType } from 'react';

export function createProductThumbnail(src: string): ComponentType {
  return function ProductThumbnail() {
    return (
      <div className="relative size-full bg-white">
        <img
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          src={src}
        />
      </div>
    );
  };
}
