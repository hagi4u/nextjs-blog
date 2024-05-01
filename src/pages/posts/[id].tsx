import { MarkdownViewer } from '@/components/Markdown';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const supabase = createClient({});

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('id');

  return {
    paths: data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? [],
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const id = context.params?.id;

  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));

  if (!data || !data[0]) {
    return { notFound: true };
  }

  const { title, category, created_at, tags, content, preview_image } = data[0];
  return {
    props: {
      id: Number(id),
      title,
      category,
      created_at,
      tags: JSON.parse(tags) as string[],
      content,
      preview_image,
    },
  };
}) satisfies GetStaticProps<Post>;

export default function PostPage({
  id,
  title,
  category,
  tags,
  content,
  created_at,
  preview_image,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="container flex flex-col gap-8 pb-40 pt-20">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-row items-center gap-2">
        <Link
          href={`/category/${category}`}
          className="rounded-md bg-slate-800 px-2 py-1 text-sm text-white"
        >
          {category}
        </Link>
        {tags.map((tag) => (
          <Link
            href={`/tag/${tag}`}
            key={tag}
            className="rounded-md bg-slate-400 px-2 py-1 text-sm text-white"
          >
            {tag}
          </Link>
        ))}
        <div className="text-sm text-gray-400">
          {format(new Date(created_at), 'yyyy년 M월 d일 HH:mm')}
        </div>
      </div>

      {preview_image && (
        <Image
          src={preview_image}
          width={0}
          height={0}
          sizes="100vw"
          alt={title}
          className="mt-8 h-auto w-full"
        />
      )}
      <MarkdownViewer source={content} className="mt-8 min-w-full " />
    </div>
  );
}
