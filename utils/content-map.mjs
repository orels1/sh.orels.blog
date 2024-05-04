import fs from 'node:fs/promises';
import path from 'node:path';
import { getMDXContent, getPostsSlugs } from './content-utils.mjs';
import dayjs from 'dayjs';

(async () => {
  console.log('⚡ Starting Content Aggregator');

  console.log('🔍 Looking for posts');
  
  const slugs = await getPostsSlugs();

  console.log('📝 Found', slugs.length, 'posts');

  console.log('💡 Rendering posts');

  const content = await Promise.all(slugs.map(async (slug) => {
    return await getMDXContent(slug.slug);
  }));

  console.log('✨ Rendered', content.length, 'posts');

  console.log('🔖 Grouping by tag');

  const tags = new Set();
  const latestPost = {};
  const groupedByTag = content.reduce((acc, post) => {
    for (const tag of post.frontmatter.tags) {
      const lowercased = tag.toLowerCase();
      if (!tags.has(lowercased)) {
        latestPost[lowercased] = dayjs(post.frontmatter.created);
        tags.add(lowercased);
        acc[lowercased] = [post];
      } else {
        if (latestPost[lowercased].isBefore(dayjs(post.frontmatter.created))) {
          latestPost[lowercased] = dayjs(post.frontmatter.created);
        }
        acc[lowercased].push(post);
      }
    }
    return acc;
  }, {});

  for (const tag in groupedByTag) {
    groupedByTag[tag] = groupedByTag[tag].sort((a, b) => dayjs(b.frontmatter.created).diff(dayjs(a.frontmatter.created)));
  }

  const sortedGroupedByTag = Object.keys(groupedByTag).sort((a, b) => latestPost[b].diff(latestPost[a])).reduce((acc, key) => {
    acc[key] = groupedByTag[key];
    return acc;
  }, {});

  console.log('📚 Found', tags.size, 'tags\n');

  console.log('📚 Grouped Entries:');
  Object.entries(sortedGroupedByTag).forEach(([tag, entries]) => {
    console.log(`${tag}: ${entries.length} entries`);
  });

  console.log('\n📦 Writing to file');

  await fs.writeFile(path.join('../', 'app', 'content-map.json'), JSON.stringify(sortedGroupedByTag));
})();