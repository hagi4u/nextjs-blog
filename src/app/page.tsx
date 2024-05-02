import PostList from '@/components/PostList';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createClient(cookies());
  const { data } = await supabase.from('Post').select('*');
  const posts =
    data?.map((post) => {
      return {
        ...post,
        tags: JSON.parse(post.tags),
      };
    }) ?? [];

  return <PostList initialPosts={posts} />;
}
