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
  description?: string;
  image?: string;
  site: string;
  author: string;
  url: string;
}) {
  return (
    <Link href={url} target="_blank" className="no-underline">
      <div className="ring-1 group ring-inset dark:ring-white/10 ring-zinc-300 rounded-xl overflow-hidden flex dark:bg-white/10 bg-zinc-300/10 my-4">
        <div className="flex flex-col grow justify-between gap-2 p-4">
          <div className="text-xl font-bold dark:group-hover:text-sky-500 group-hover:text-sky-600">
            {title}
          </div>
          {description && (
            <div className="text-sm dark:text-slate-400 text-slate-600 dark:font-light leading-6">
              {description}
            </div>
          )}
          <div className="flex items-center gap-4 text-sm">
            <div>{site}</div>
            <div className="dark:bg-white bg-zinc-800 rounded-full w-[4px] h-[4px]" />
            <div>{author}</div>
          </div>
        </div>
        {image && (
          <div className="hidden md:flex aspect-square w-[150px] relative rounded-e-xl flex-shrink-0 overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url(${image})`}} />
        )}
      </div>
    </Link>
  )
}
