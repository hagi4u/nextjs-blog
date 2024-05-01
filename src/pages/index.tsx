import PostList from '@/components/PostList';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { GetStaticProps } from 'next';

export const getStaticProps = (async () => {
  const supabase = createClient({});
  const { data } = await supabase.from('Post').select('*');

  return {
    props: {
      posts:
        data?.map((post) => {
          return {
            ...post,
            tags: JSON.parse(post.tags),
          };
        }) ?? [],
    },
  };
}) satisfies GetStaticProps<{
  posts: Post[];
}>;

export default function Home() {
  return <PostList />;
}
