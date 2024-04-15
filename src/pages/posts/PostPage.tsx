import Link from 'next/link';
import { PostProps } from './[id]';

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
      </div>

      {tags.map((tag) => (
        <Link
          href={`/tags/${tag}`}
          key={tag}
          className="rounded-md bg-slate-800 px-2 py-1 text-sm text-white"
        >
          {tag}
        </Link>
      ))}
      <div className="text-sm text-gray-500">
        {new Date(created_at).toLocaleDateString()}
      </div>
      {content}
      {preview_image && <Image />}
    </div>
  );
}
