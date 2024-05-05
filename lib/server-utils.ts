import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";

export async function getPosts() {
	const postPaths = (await fs.readdir(path.join("app", "_posts"))).filter(
		(postFilePath) => {
			return path.extname(postFilePath).toLowerCase() === ".mdx";
		},
	);

	const postSlugs = postPaths.map((tipPath) => tipPath.slice(0, -4));

	const pagesData = await Promise.all(
		postSlugs.map(async (slug) => {
			const content = await fs.readFile(
				path.join("app", "_posts", `${slug}.mdx`),
				"utf-8",
			);
			const mdx = await compileMDX<{
				title: string;
				tags: string[];
				created: string;
				updated: string;
				excerpt: string;
				image: string;
			}>({
				source: content,
				options: { parseFrontmatter: true },
			});

			return {
				...mdx,
				rawContent: content,
			};
		}),
	);

	const content = pagesData
		.map((page, index) => ({
			...page.frontmatter,
			slug: postSlugs[index],
			content: extractMarkdownContent(page.rawContent),
		}))
		.sort(
			(a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
		);

	return content;
}

export const extractMarkdownContent = (content: string) => {
	const frontmatterRegex = /---[\s\S]*?---/;
	const markdownContent = content.replace(frontmatterRegex, "").trim();
	return markdownContent;
};
