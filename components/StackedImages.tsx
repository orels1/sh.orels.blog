import ZoomImage from "./ZoomImage";

export default function StackedImages({
  imageList,
  aspect,
} : {
  imageList: string[];
  aspect?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-4 [&_span]:my-0 [&_span]:mx-auto">
        {imageList.map((src, i) => (
          <ZoomImage 
            key={i}
            src={src}
            style={aspect ? { aspectRatio: aspect } : {}}
            className="max-w-[230px] mt-0 mb-0"
          />
        ))}
      </div>
      <span className="text-xs text-center dark:text-gray-400 text-gray-700">
        Click on images to expand them
      </span>
    </div>
  )
}