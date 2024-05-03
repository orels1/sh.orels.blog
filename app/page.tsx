import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const content = [
  {
    title: '2023 year in Review',
    slug: '2023-year-in-review',
    id: 0,
    tags: ['Development'],
    exceprt: 'It\'s time to rewind to the beginning of the year to look at the things I\'ve made and shared, as well as a couple of projects that I haven\'t talked about publicly before.',
    created: '2023-12-30',
    image: 'https://blog.orels.sh/content/images/size/w1200/2023/12/photo-1649290098499-f4148542f2e0.jpeg',
  },
  {
    title: 'Items of Interest #1',
    slug: 'items-of-interest-1',
    id: 1,
    tags: ['Game Design'],
    exceprt: 'From game design references, interesting shader tricks, and articles worth reading, to more in-depth thoughts and opinions',
    created: '2023-12-25',
    image: 'https://blog.orels.sh/content/images/size/w1200/2023/12/photo-1514377006585-6e7975371bd6.jpeg',
  },
  {
    title: 'You should probably be using Cinemachine',
    slug: 'you-should-probably-be-using-cinemachine',
    id: 2,
    created: '2023-02-08',
    tags: ['Unity'],
    exceprt: 'This tutorial is going to guide you through one of the Cinemachine\'s most powerful systems - State-Driven Cameras. Which should allow you to create stunning virtual productions with almost 0 scripting.',
    image: 'https://blog.orels.sh/content/images/size/w1200/2023/02/cinemachine-blog-post-cover.png',
  }
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold">orels1 types words...</h1>
      <h2 className="text-md font-light text-secondary-foreground">...and you read them</h2>
      <div className="grid grid-cols-3 mt-6 gap-6">
        {content.map((post) => (
          <div key={post.id} className="rounded-xl ring-1 ring-white/10 p-4 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden aspect-video relative">
              <Image src={post.image} alt={post.title} className="object-cover" fill />
            </div>
            <Link href={`/${post.slug}`}>
              <h3 className="font-semibold text-lg">{post.title}</h3>
            </Link>
            <p className="text-md font-light">
              {post.exceprt}
            </p>
            <div className="flex grow" />
            <div className="flex items-center gap-2">
              <Link href={`/${post.slug}`} className="flex grow">
                <Button variant="outline" className="flex grow" size="sm">Read</Button>
              </Link>
              <Button variant="outline" title="Copy Link" size="sm"><LinkIcon size="16" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
