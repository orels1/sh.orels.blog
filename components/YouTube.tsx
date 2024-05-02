'use client';

export default function YouTube({ id } : { id: string; })
{
  return (
    <div
      className="relative my-8 rounded-xl overflow-hidden aspect-video"
    >
      <iframe 
        src={`https://www.youtube.com/embed/${id}`}
        className="border-0 absolute top-0 h-full w-full"
        allowFullScreen
      />
    </div>
  )
}