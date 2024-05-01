import Button from '@/components/Button';
import Input from '@/components/Input';
import { MarkdownEditor } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import ReactSelect from 'react-select';

type ReactSelectProps = {
  label: string;
  value: string;
};

const Write = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: existingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from('Post').select('category');
      return Array.from(new Set(data?.map((d) => d.category)));
    },
  });

  const { data: existingTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from('Post').select('tags');

      return Array.from(
        new Set(
          data?.flatMap((d) => JSON.parse(d.tags).map((tag: string) => tag)),
        ),
      );
    },
  });

  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', titleRef.current?.value ?? '');
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('content', content);

    if (fileRef.current?.files?.[0]) {
      formData.append('preview_image', fileRef.current.files[0]);
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.id) {
      router.push(`/posts/${data.id}`);
    }
  };

  return (
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="제목" />
          <Input type="file" ref={fileRef} accept="image/*" />

          <ReactSelect
            options={(existingCategories ?? []).map((category) => {
              return {
                label: category,
                value: category,
              };
            })}
            placeholder="카테고리"
            isMulti={false}
            onChange={(e) => e && setCategory(e.value)}
          />
          <ReactSelect
            options={(existingTags ?? []).map((tag) => {
              return {
                label: tag,
                value: tag,
              };
            })}
            placeholder="태그"
            isMulti
            onChange={(e) =>
              e && setTags(JSON.stringify(e.map((e) => e.value)))
            }
          />
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(e) => e && setContent(e)}
          />
          <Button type="submit" className="mt-4">
            작성하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Write;
