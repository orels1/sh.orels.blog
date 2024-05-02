'use client';

import Link from "next/link";

export default function LinkEmbed({
  title,
  description,
  image,
  site,
  author,
  url
} : {
  title: string;
  description: string;
  image?: string;
  site: string;
  author: string;
  url: string;
}) {
  return (
    <Link href={url} target="_blank" className="no-underline">
      <div className="ring-1 group ring-inset ring-white/10 rounded-xl overflow-hidden flex bg-white/10 my-4">
        <div className="flex flex-col grow justify-between gap-2 p-4">
          <div className="text-xl font-bold group-hover:text-accent-foreground">
            {title}
          </div>
          <div className="text-sm text-slate-400 font-light leading-6">
            {description}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>{site}</div>
            <div className="bg-white rounded-full w-[4px] h-[4px]" />
            <div>{author}</div>
          </div>
        </div>
        {image && (
          <div className="hidden md:flex aspect-square w-[300px] relative rounded-e-xl overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url(${image})`}} />
        )}
      </div>
    </Link>
  )
}
