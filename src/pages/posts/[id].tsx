import { createClient } from '@/utils/supabase/server';
import { GetServerSideProps } from 'next';

type PostProps = {
  id: string;
};

export default function Post({ id }: PostProps) {
  return (
    <div className="flex">
      <h1>Post{id}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id } = query;
  const supabase = createClient(req.cookies);
  const response = await supabase.from('Post').select('*').eq('id', Number(id));

  console.log('response: ', response);
  return {
    props: {
      id,
    },
  };
};
