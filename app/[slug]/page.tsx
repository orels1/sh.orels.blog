import { cn } from '@/lib/utils';
import Link from 'next/link';
import fs from 'node:fs/promises';
import path from 'node:path';
import Tweet from '@/components/Tweet';
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';


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
  h1: (props: any) => <h1 className="" {...props} />,
  h2: (props: any) => <Link href={`/${slug}/#${props.id}`} className="no-underline" scroll><h2 {...props} /></Link>,
  h3: (props: any) => <Link href={`/${slug}/#${props.id}`} className="no-underline" scroll><h3 {...props} /></Link>,
  h4: (props: any) => <Link href={`/${slug}/#${props.id}`} className="no-underline" scroll><h4 {...props} /></Link>,
  pre: (props: any) => <pre {...props} className={cn(props.className, "rounded-md my-4")} />,
  blockquote: (props: any) => <blockquote {...props} className={cn(props.className, "ring-inset ring-1 ring-white/10 bg-white/10 rounded-md px-4 my-4 py-[1px]")} />,
  p: (props: any) => <p {...props} className={cn(props.className, "")} />,
  ul: (props: any) => <ul {...props} className={cn(props.className, "")} />,
  li: (props: any) => <li {...props} className={cn(props.className, "")} />,
  a: (props: any) => <Link {...props} className={cn(props.className, "no-underline hover:underline underline-offset-2")} />,
  img: (props: any) => (
    <span className="flex items-center flex-col my-4">
      <img {...props} className={cn(props.className, "rounded-md mb-2")} />
      <span className="text-xs dark:text-gray-400 text-gray-700">
        {props.title}
      </span>
    </span>
  ),
  Tweet
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
        <div className="prose prose-invert">
          <MDXRemote
            source={content}
            options={{ parseFrontmatter: true }}
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