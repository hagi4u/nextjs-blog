import PostList from '@/components/PostList';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

type CategoryPostsProps = {
  category: string;
  posts: Post[];
};

const supabase = createClient({});

export const getStaticPaths = (async (context) => {
  const { data } = await supabase.from('Post').select('category');
  const categories = Array.from(new Set(data?.map((d) => d.category)));
  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('category', context.params?.category);
  return {
    props: {
      category: context.params?.category as string,
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags),
        })) ?? [],
    },
  };
}) satisfies GetStaticProps<CategoryPostsProps>;

export default function CategoryPosts({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList category={category} />;
}
