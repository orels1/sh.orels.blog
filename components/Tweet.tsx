'use client';
import { TwitterTweetEmbed } from "react-twitter-embed";

export default function Tweet({ tweetId }: { tweetId: string }) {
  return (
    <div className="w-full  [&_.twitter-tweet]:max-w-[400px] [&_.twitter-tweet]:md:max-w-[550px]">
      <div className="m-auto [&_.twitter-tweet]:m-auto">
        <TwitterTweetEmbed tweetId={tweetId} />
      </div>
    </div>
  );
}
