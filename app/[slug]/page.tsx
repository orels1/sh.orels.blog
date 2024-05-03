import { cn } from '@/lib/utils';
import Link from 'next/link';
import fs from 'node:fs/promises';
import path from 'node:path';
import Tweet from '@/components/Tweet';
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { LinkIcon } from 'lucide-react';
import rehypeSlug from 'rehype-slug';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';
import BunnyVideo from '@/components/BunnyVideo';
import YouTube from '@/components/YouTube';
import LinkEmbed from '@/components/LinkEmbed';
import Collapsible from '@/components/Collapsible';
import ZoomImage from '@/components/ZoomImage';
import { Suspense } from 'react';
import StackedImages from '@/components/StackedImages';


export async function generateStaticParams()
{
  const postPaths = (await fs.readdir(path.join('app', '_posts'))).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  return postPaths.map((tipPath) => {
    const slug = tipPath.slice(0, -4);
    return {
      slug
    }
  });
}

const components = (slug: string) => ({
  h1: (props: any) => <h1 className="hover:text-accent-foreground" {...props} />,
  h2: (props: any) => (
    <Link href={`/${slug}/#${props.id}`} className="no-underline hover:text-accent-foreground transition-colors [&_h2]:hover:text-accent-foreground [&_h2]:transition-colors group flex items-center" scroll>
      <h2 {...props}  />
      <LinkIcon size={18} className="hidden group-hover:flex relative top-[11px] ml-3" />
    </Link>
  ),
  h3: (props: any) => <Link href={`/${slug}/#${props.id}`} className="no-underline hover:text-accent-foreground transition-colors [&_h3]:hover:text-accent-foreground [&_h3]:transition-colors group flex items-center" scroll><h3 {...props} /></Link>,
  h4: (props: any) => <Link href={`/${slug}/#${props.id}`} className="no-underline hover:text-accent-foreground transition-colors [&_h4]:hover:text-accent-foreground [&_h4]:transition-colors group flex items-center" scroll><h4 {...props} /></Link>,
  pre: (props: any) => <pre {...props} className={cn(props.className, "rounded-md my-4")} />,
  code: (props: any) => <code {...props} className={cn(props.className, "font-mono")} />,
  blockquote: (props: any) => <blockquote {...props} className={cn(props.className, "ring-inset ring-1 ring-white/10 bg-white/10 rounded-md px-4 my-4 py-[1px]")} />,
  p: (props: any) => <p {...props} className={cn(props.className, "")} />,
  ul: (props: any) => <ul {...props} className={cn(props.className, "")} />,
  li: (props: any) => <li {...props} className={cn(props.className, "")} />,
  a: (props: any) => <Link {...props} className={cn(props.className, "hover:text-accent-foreground no-underline hover:underline underline-offset-2")} />,
  table: (props: any) => <table {...props} className={cn(props.className, "table-auto w-full my-4")} />,
  th: (props: any) => <th {...props} className={cn(props.className, "border-b border-white/10 px-4 py-2")} />,
  td: (props: any) => <td {...props} className={cn(props.className, "border-b border-white/10 px-4 py-2")} />,
  tr: (props: any) => <tr {...props} className={cn(props.className, "")} />,
  thead: (props: any) => <thead {...props} className={cn(props.className, "")} />,
  img: (props: any) => (
    <span className="flex items-center flex-col my-4">
      <img {...props} className={cn(props.className, "rounded-md mb-2")} />
      <span className="text-xs dark:text-gray-400 text-gray-700">
        {props.title}
      </span>
    </span>
  ),
  Tweet,
  BunnyVideo,
  YouTube,
  LinkEmbed,
  Collapsible,
  ZoomImage,
  StackedImages,
});

export default async function Page({
  params: {
    slug
  }
} : {
  params: {
    slug: string;
  }
}) {
  const content = await fs.readFile(path.join('app', '_posts', slug + '.mdx'), 'utf-8');
  const mdx = await compileMDX<{
    title: string;
    tags?: string[];
    created: string;
    image: string;
    imageCredit?: string;
    imageCreditLink?: string;
  }>({
    source: content,
    options: { parseFrontmatter: true }
  });

  return (
    <div className="flex flex-row flex-wrap gap-12 grow">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-4">{mdx.frontmatter.title}</h1>
        <div className="relative rounded-lg overflow-hidden my-4 aspect-video">
          <Image src={mdx.frontmatter.image} alt={mdx.frontmatter.title} className="object-cover" fill />
        </div>
        {mdx.frontmatter.imageCredit && (
          <div className="text-sm text-slate-400 mb-4">
            <Link href={mdx.frontmatter.imageCreditLink ?? '#'} target="_blank" className="hover:underline underline-offset-2">{mdx.frontmatter.imageCredit}</Link>
          </div>
        )}
        <div className="prose prose-invert prose-lg">
          <MDXRemote
            source={content}
            options={{ 
              parseFrontmatter: true,
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [
                  rehypeSlug,
                  rehypePrism,
                ]
              }
            }}
            components={components(slug)}
          />
        </div>
      </div>
      <div className="flex flex-col grow gap-6 max-w-[400px]">
        <div className="rounded-xl ring-1 ring-white/10 p-4 flex flex-col gap-4">
          <div>Posted on: {mdx.frontmatter.created}</div>
          <div className="flex flex-row gap-3 flex-wrap">
            {mdx.frontmatter.tags?.map(tag => (
              <div key={tag} className="rounded-md bg-white/10 text-white/80 px-4 py-1">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-lg font-semibold mt-6">Continue Reading</h2>
        <div>Other posts here...</div>
      </div>
    </div>
  )
}