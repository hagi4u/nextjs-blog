import { useTags } from '@/utils/hooks';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

const supabase = createClient();

export default function TagPage() {
  const { data: tags } = useTags();
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
