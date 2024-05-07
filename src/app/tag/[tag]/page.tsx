import PostList from '@/components/PostList';
import { getPosts, getTags } from '@/utils/fetch';
import { Metadata } from 'next';

type TagPageProps = {
  params: { tag: string };
};

export const generateMetadata = ({ params }: TagPageProps): Metadata => {
  return {
    title: decodeURIComponent(params.tag),
    description: decodeURIComponent(params.tag),
  };
};

export const generateStaticParams = async () => {
  const tags = await getTags();
  return tags.map((tag) => ({
    tag,
  }));
};

export default async function TagPosts({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPosts({ tag });

  return <PostList initialPosts={posts} tag={tag} />;
}
