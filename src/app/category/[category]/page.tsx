import PostList from '@/components/PostList';
import { getPosts } from '@/utils/fetch';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';

type CategoryPostsProps = {
  params: { category: string };
};

export const generateMetadata = ({ params }: CategoryPostsProps): Metadata => {
  return {
    title: decodeURIComponent(params.category),
    description: decodeURIComponent(params.category),
  };
};

export const generateStaticParams = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('Post').select('category');
  const categories = Array.from(new Set(data?.map((d) => d.category)));
  return categories.map((category) => ({ category }));
};

export default async function CategoryPosts({ params }: CategoryPostsProps) {
  const category = decodeURIComponent(params.category);
  const postData = await getPosts({ category });

  return <PostList initialPosts={postData} category={category} />;
}
