import { getTags } from '@/utils/fetch';
import Link from 'next/link';

export default async function TagPage() {
  const tags = await getTags();

  return (
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="text-center text-2xl">Tags</h1>
      {tags?.map((tag) => (
        <Link key={tag} href={`/tag/${tag}`}>
          # {tag}
        </Link>
      ))}
    </div>
  );
}
