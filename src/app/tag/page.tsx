import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function TagPage() {
  const supabase = createClient(cookies());

  const { data } = await supabase.from('Post').select('category');
  const exsitingTags = Array.from(new Set(data?.map((d) => d.category)));

  return (
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="text-center text-2xl">Tags</h1>
      {exsitingTags?.map((tag) => (
        <Link key={tag} href={`/tag/${tag}`}>
          # {tag}
        </Link>
      ))}
    </div>
  );
}
