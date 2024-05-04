import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import CopyButton from "@/components/CopyButton";

export default function PostCard({
  post
} : {
  post: {
    title: string;
    slug: string;
    created: string;
    tags: string[];
    excerpt: string;
    image: string;
  };
}){
  return (
    <div className="rounded-xl ring-1 dark:ring-white/10 ring-zinc-300 p-4 flex flex-col gap-4">
      <div className="rounded-xl overflow-hidden aspect-video relative">
        <Link href={`/${post.slug}`}>
          <Image src={post.image} alt={post.title} className="object-cover" fill />
        </Link>
      </div>
      <Link href={`/${post.slug}`}>
        <h3 className="font-semibold text-lg">{post.title}</h3>
      </Link>
      <p className="text-md font-light">
        {post.excerpt}
      </p>
      <div className="flex grow" />
      <div className="flex flex-col gap-2">
        <div className="text-sm">{dayjs(post.created).format('MMMM D, YYYY')}</div>
        <div className="flex items-center gap-2">
          <Link href={`/${post.slug}`} className="flex grow">
            <Button variant="outline" className="flex grow" size="sm">Read</Button>
          </Link>
          <CopyButton text={`https://blog.orels.sh/${post.slug}`} />
        </div>
      </div>
    </div>
  )
}