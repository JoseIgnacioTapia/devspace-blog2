import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Post from '../../components/Post';

import { sortByDate } from '../../utils/index.js';

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5">Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug, // destructuring
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort((a, b) => sortByDate(a, b)),
    },
  };
}