'use client';
import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function ZoomImage({
  title,
  src,
  className,
  alt,
  style,
}: {
  title?: string;
  src: string;
  className?: string;
  alt?: string;
  style?: CSSProperties;
}) {
  return (
    <span className="flex items-center flex-col my-4">
      <Zoom classDialog="[&_div[data-rmiz-modal-overlay=visible]]:bg-black/80">
        <img style={style} src={src} alt={alt ?? title} title={title} className={cn("rounded-md mb-2", className)} />
      </Zoom>
      {title && (
        <span className="text-xs dark:text-gray-400 text-gray-700">
          {title}
        </span>
      )}
    </span>
  )
}