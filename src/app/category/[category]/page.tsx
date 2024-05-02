import PostList from '@/components/PostList';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

type CategoryPostsProps = {
  category: string;
  posts: Post[];
};

export const generateStaticParams = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('Post').select('category');
  const categories = Array.from(new Set(data?.map((d) => d.category)));
  return categories.map((category) => ({ category }));
};

export default async function CategoryPosts({
  params,
}: {
  params: { category: string };
}) {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('category', params?.category);
  const postData =
    data?.map((post) => ({
      ...post,
      tags: JSON.parse(post.tags),
    })) ?? [];

  return <PostList initialPosts={postData} category={params.category} />;
}
