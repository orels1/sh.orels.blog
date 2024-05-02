This is an in-progress transition of [my personal blog](https://blog.orels.sh), currently hosted and powered by Ghost, to Next.js and vercel.

The main reason for that - I don't want to pay $300/yr for a nice editor and a few other features that I don't need. I also want to have more control over the content and the way it's displayed.

## Tech Used

- Next.js
- Tailwind CSS

## General Structure

- The post markdown files live in the `_posts` folder and are hidden from direct publishing
- The `app/[slug]/page.tsx` is responsible for scanning the posts folder and rendering individual pages
- The `next-mdx-remote` is then rendering the final file contents during server-side generation
- The final static files are served by vercel

This setup is basically a mirror of my [tips website](https://tips.orels.sh). And while I could've just re-used the whole thing - I wanted to go for a different look and configure the website from scratch as they have different goals.

Feel free to fork this whenever it is finished if you ever wanted your own static blog!
