import contentMap from '@/app/content-map.json';
import PostCard from '@/components/PostCard';

export async function generateStaticParams()
{
  return Object.keys(contentMap).map((tag) => {
    return {
      tag: tag.toLowerCase(),
    }
  });
}

export default function TagPage({
  params: {
    tag,
  },
} : {
  params: {
    tag: string;
  };
}) {  
  const decoded = decodeURIComponent(tag) as keyof typeof contentMap;
  const content = contentMap?.[decoded] ?? [];

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold">{decoded.charAt(0).toUpperCase() + decoded.slice(1)}</h1>
      <h2 className="text-md font-light text-secondary-foreground">All posts for tag</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
        {content.map((post) => (
          <PostCard key={post.slug} post={{...post.frontmatter, slug: post.slug}} />
        ))}
      </div>
    </div>
  )
}