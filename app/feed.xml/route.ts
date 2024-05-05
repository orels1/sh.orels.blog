import { getPosts } from "@/lib/server-utils";
import { Feed } from "feed";
import { type NextRequest, NextResponse } from "next/server";

export async function GET() {
	const feed = new Feed({
		title: "orels' Blog",
		author: {
			name: "orels1",
			email: "ping@orels.sh",
		},
		description: "orels1 types words... and you read them",
		id: "https://blog.orels.sh",
		link: "https://blog.orels.sh",
		image: "https://blog.orels.sh/orels-blog-splash.png",
		favicon: "https://blog.orels.sh/icon.png",
		copyright: "Copyright 2024 orels1",
		feedLinks: {
			rss2: "https://blog.orels.sh/feed.xml",
		},
	});

	const posts = await getPosts();
	for (const post of posts) {
		feed.addItem({
			title: post.title,
			id: `https://blog.orels.sh/${post.slug}`,
			link: `https://blog.orels.sh/${post.slug}`,
			description: post.excerpt,
			date: new Date(post.created),
			content: post.content,
			author: [
				{
					name: "orels1",
					email: "ping@orels.sh",
				},
			],
			contributor: [
				{
					name: "orels1",
					email: "ping@orels.sh",
				},
			],
			image: `https://blog.orels.sh${post.image}`,
		});
	}

	return new NextResponse(feed.rss2(), {
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, s-maxage=31556952",
		},
	});
}
