'use client';

export default function BunnyVideo({ id, aspect } : { id: string; aspect?: string })
{
  return (
    <div
      className="relative my-8 rounded-xl overflow-hidden"
      style={{ aspectRatio: aspect ?? '16 / 9' }}
    >
      <iframe 
        src={`https://iframe.mediadelivery.net/embed/165/${id}?autoplay=true&loop=true&muted=true&preload=true&responsive=true`}
        className="border-0 absolute top-0 h-full w-full"
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        loading="lazy"
        allowFullScreen />
    </div>
  )
}