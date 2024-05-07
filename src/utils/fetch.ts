import { cache } from 'react';
import { createClient as createBrowserClient } from './supabase/client';
import { createClient as createServerClient } from './supabase/server';

const getSupabaseClient = () =>
  typeof window === 'undefined' ? createServerClient() : createBrowserClient();

export const getPosts = cache(
  async ({
    category,
    tag,
    page = 0,
  }: {
    category?: string;
    tag?: string;
    page?: number;
  }) => {
    const supabase = getSupabaseClient();

    let request = supabase.from('Post').select('*');

    if (category) {
      request = request.eq('category', category);
    }
    if (tag) {
      request = request.like('tag', `%${tag}%`);
    }

    const { data } = await request
      .order('created_at', { ascending: false })
      .range(page, page + 3);

    return data?.map((post) => ({
      ...post,
      tags: JSON.parse(post.tags),
    }));
  },
);

export const getPost = cache(async (id: string) => {
  const supabase = getSupabaseClient();
  const { data } = await supabase.from('Post').select('*').eq('id', Number(id));

  if (!data || !data[0]) {
    return null;
  }

  return {
    ...data[0],
    tags: JSON.parse(data[0].tags) as string[],
  };
});

export const getTags = cache(async () => {
  const supabase = getSupabaseClient();
  const { data } = await supabase.from('Post').select('tags');

  return Array.from(
    new Set(data?.flatMap((d) => JSON.parse(d.tags).map((tag: string) => tag))),
  );
});

export const getCategories = cache(async () => {
  const supabase = getSupabaseClient();
  const { data } = await supabase.from('Post').select('category');
  return Array.from(new Set(data?.map((d) => d.category)));
});
