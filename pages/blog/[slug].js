import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function PostPage({
  frontmatter: { title, category, data, cover_image, author, author_image },
  content,
  slug,
}) {
  return <div>{title}</div>;
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false, // Go to 404 page If It doesn´t exist the path
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}

export default PostPage;
