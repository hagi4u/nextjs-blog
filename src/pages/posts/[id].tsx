import { MarkdownViewer } from '@/components/Markdown';
import { Post } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type PostProps = Post;

export default function PostPage({
  id,
  title,
  category,
  tags,
  content,
  created_at,
  preview_image,
}: PostProps) {
  return (
    <div className="container mx-auto flex flex-col px-4 pb-40 pt-20">
      <h1 className="mb-8 text-4xl font-bold">{title}</h1>
      <div className="flex flex-row items-center gap-2">
        <Link
          href={`/categories/${category}`}
          className="rounded-md bg-slate-800 px-2 py-1 text-sm text-white"
        >
          {category}
        </Link>
        {tags.map((tag) => (
          <Link
            href={`/tags/${tag}`}
            key={tag}
            className="rounded-md bg-slate-800 px-2 py-1 text-sm text-white"
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;
  const supabase = createClient(req.cookies);

  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));

  if (!data || !data[0]) {
    return { notFound: true };
  }

  const { title, category, created_at, tags, content, preview_image } = data[0];

  console.log('response: ', data);
  return {
    props: {
      id,
      title,
      category,
      created_at,
      tags: JSON.parse(tags) as string[],
      content,
      preview_image,
    },
  };
};
