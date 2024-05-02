// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostRequest } from '@/types';
import { createClient } from '@/utils/supabase/server';
import { format } from 'date-fns';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function DELETE() {
  const supabase = await createClient(cookies());
  const { error } = await supabase.from('Post').delete().eq('category', 'Test');

  if (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      },
    );
  } else {
    return Response.json({ message: 'ok' }, { status: 200 });
  }
}
export async function POST(request: NextRequest) {
  const supabase = await createClient(cookies());
  const formEntries = Array.from((await request.formData()).entries());
  const formData = formEntries.reduce<Record<string, FormDataEntryValue>>(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {},
  );

  const { preview_image, ...fields } = formData as unknown as Omit<
    PostRequest,
    'preview_image_url'
  > & {
    preview_image?: File;
  };

  let preview_image_url: string | null = null;

  if (preview_image) {
    const fileName = `${preview_image.name}_${format(new Date(), 'yyyyMMddHHmmss')}`;

    const { data: uploadData, error } = await supabase.storage
      .from('blog-image')
      .upload(fileName, preview_image, {
        contentType: preview_image.type,
      });

    if (error) {
      return Response.json({ error }, { status: 403 });
    }

    if (uploadData?.path) {
      const { data } = await supabase.storage
        .from('blog-image')
        .getPublicUrl(uploadData.path);
      preview_image_url = data.publicUrl;
    }
  }

  const { data, error } = await supabase
    .from('Post')
    .insert([{ ...fields, preview_image: preview_image_url }])
    .select();

  if (error) {
    return Response.json({ error }, { status: 403 });
  }

  if (data && data.length === 1) {
    const { tags, ...rest } = data[0];
    return Response.json(
      {
        ...rest,
        tags: JSON.parse(tags),
      },
      { status: 200 },
    );
  }
}
