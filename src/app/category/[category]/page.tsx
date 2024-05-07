import PostList from '@/components/PostList';
import { Post } from '@/types';
import { getPosts } from '@/utils/fetch';
import { createClient } from '@/utils/supabase/server';

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
  const category = decodeURIComponent(params.category);
  const postData = await getPosts({ category });

  return <PostList initialPosts={postData} category={category} />;
}
