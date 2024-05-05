import PostCard from "@/components/PostCard";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from 'node:fs/promises';
import path from 'node:path';

export default async function Home() {
  const postPaths = (await fs.readdir(path.join('app', '_posts'))).filter((postFilePath) => {
    return path.extname(postFilePath).toLowerCase() === ".mdx";
  });

  const postSlugs = postPaths.map((tipPath) => tipPath.slice(0, -4));

  const pagesData = await Promise.all(postSlugs.map(async (slug) => {
    const content = await fs.readFile(path.join('app', '_posts', slug + '.mdx'), 'utf-8');
    const mdx = await compileMDX<{
      title: string;
      tags: string[];
      created: string;
      updated: string;
      excerpt: string;
      image: string;
    }>({
      source: content,
      options: { parseFrontmatter: true }
    });

    return mdx;
  }));

  const content = pagesData
    .map((page, index) => ({
      ...page.frontmatter,
      slug: postSlugs[index]
    }))
    .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold">orels1 types words...</h1>
      <h2 className="text-md font-light text-secondary-foreground">...and you read them</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
        {content.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
