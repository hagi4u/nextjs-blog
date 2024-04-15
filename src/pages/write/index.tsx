import { MarkdownEditor } from '@/components/Markdown';
import { createClient } from '@/utils/supabase/server';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useRef, useState } from 'react';
import ReactSelect from 'react-select';

type ReactSelectProps = {
  label: string;
  value: string;
};

type WriteProps = {
  existingTags: ReactSelectProps[];
  existingCategories: ReactSelectProps[];
};

const Write = ({ existingTags, existingCategories }: WriteProps) => {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
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
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="hover:border-grey-400 rounded-md border border-gray-300 p-2 transition-all"
          />
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            className="hover:border-grey-400 rounded-md border border-gray-300 p-2 transition-all"
          />
        </div>
        <ReactSelect
          options={existingCategories}
          placeholder="카테고리"
          isMulti={false}
          onChange={(e) => e && setCategory(e.value)}
        />
        <ReactSelect
          options={existingTags}
          placeholder="태그"
          isMulti
          onChange={(e) => e && setTags(JSON.stringify(e.map((e) => e.value)))}
        />
        <MarkdownEditor
          height={500}
          value={content}
          onChange={(e) => e && setContent(e)}
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white"
        >
          작성하기
        </button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<WriteProps> = async ({
  req,
}) => {
  const supabase = createClient(req.cookies);
  const { data } = await supabase.from('Post').select('category, tags');
  return {
    props: {
      existingCategories: Array.from(
        new Set(
          data?.map((d) => ({
            label: d.category,
            value: d.category,
          })),
        ),
      ),
      existingTags: Array.from(
        new Set(
          data?.flatMap((d) =>
            JSON.parse(d.tags).map((tag: string) => ({
              label: tag,
              value: tag,
            })),
          ),
        ),
      ),
    },
  };
};

export default Write;
