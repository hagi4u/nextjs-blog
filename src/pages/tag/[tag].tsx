import PostList from '@/components/PostList';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

type TagPostsProps = {
  tag: string;
};

export const getStaticPaths = (async (context) => {
  return {
    paths: [],
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  return {
    props: {
      tag: context.params?.tag as string,
    },
  };
}) satisfies GetStaticProps<TagPostsProps>;

export default function TagPosts({
  tag,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList tag={tag} />;
}
