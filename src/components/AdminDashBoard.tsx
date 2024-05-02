'use client';

import { createClient } from '@/utils/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Button from './Button';

interface AdminDashBoardProps {
  user: UserResponse;
}
const supabase = createClient();

const AdminDashBoard: FC<AdminDashBoardProps> = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <div className="mb-8">
        <b>{user.data.user?.email}</b> 님으로 로그인하셨습니다.
      </div>
      <Button
        type="submit"
        className="w-full"
        onClick={() => router.push('/write')}
      >
        글쓰러가기
      </Button>
      <Button
        type="submit"
        className="mt-2 w-full"
        onClick={() => {
          fetch('/api/posts', {
            method: 'DELETE',
          });
        }}
      >
        테스트 글 삭제
      </Button>
      <Button
        type="submit"
        className="mt-2 w-full"
        onClick={() => {
          supabase.auth.signOut();
          router.push('/');
        }}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default AdminDashBoard;
