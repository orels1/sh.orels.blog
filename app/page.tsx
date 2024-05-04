import PostCard from "@/components/PostCard";
import { compileMDX } from "next-mdx-remote/rsc";
import fs from 'node:fs/promises';
import path from 'node:path';

const content = [
  {
    title: '2023 year in Review',
    slug: '2023-year-in-review',
    id: 0,
    tags: ['Development'],
    excerpt: 'It\'s time to rewind to the beginning of the year to look at the things I\'ve made and shared, as well as a couple of projects that I haven\'t talked about publicly before.',
    created: '2023-12-30',
    image: 'https://blog.orels.sh/content/images/size/w1200/2023/12/photo-1649290098499-f4148542f2e0.jpeg',
  },
  {
    title: 'Items of Interest #1',
    slug: 'items-of-interest-1',
    id: 1,
    tags: ['Game Design'],
    excerpt: 'From game design references, interesting shader tricks, and articles worth reading, to more in-depth thoughts and opinions',
    created: '2023-12-25',
    image: 'https://blog.orels.sh/content/images/size/w1200/2023/12/photo-1514377006585-6e7975371bd6.jpeg',
  },
  {
    title: 'You should probably be using Cinemachine',
    slug: 'you-should-probably-be-using-cinemachine',
    id: 2,
    created: '2023-02-08',
    tags: ['Unity'],
    excerpt: 'This tutorial is going to guide you through one of the Cinemachine\'s most powerful systems - State-Driven Cameras. Which should allow you to create stunning virtual productions with almost 0 scripting.',
    image: 'https://blog.orels.sh/content/images/size/w1200/2023/02/cinemachine-blog-post-cover.png',
  },
  {
    title: 'Unity Scripted Importers: Texture Generator',
    slug: 'unity-scripted-importers-part-1-texture-generator',
    id: 3,
    created: '2022-06-09',
    tags: ['Code', 'Development', 'Shaders', 'Unity', 'ScriptedImporters'],
    excerpt: 'In this article we\'ll look into what they are and how you can use them to create a procedural Texture Generator',
    image: 'https://blog.orels.sh/content/images/size/w1200/2022/06/Scripted-Importers-pt1.png',
  },
  {
    title: 'Why do you need a Shader Generator and how ModularShaderSystem is here to help',
    slug: 'creating-a-custom-shader-generation-system-with-mss-and-scriptedimporters',
    id: 4,
    created: '2022-05-27',
    tags: ['Shaders', 'Unity', 'Development', 'Code'],
    excerpt: 'Developing complex Unity Shaders is hard. Can you make your life easier? Maybe! Let\'s look into the issues of vanilla shader development and how can we sidestep some of those with Shader Generation',
    image: 'https://blog.orels.sh/content/images/size/w1200/2022/05/mss-post-header.png',
  }
]

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
