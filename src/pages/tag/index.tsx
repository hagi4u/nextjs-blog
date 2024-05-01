import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const supabase = createClient();

export default function TagPage() {
  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags');

      return Array.from(
        new Set(
          data?.flatMap((d) => JSON.parse(d.tags).map((tag: string) => tag)),
        ),
      );
    },
  });
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
