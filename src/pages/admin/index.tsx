import Input from '@/components/Input';
import { createClient } from '@/utils/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const supabase = createClient();

export default function Admin() {
  const router = useRouter();
  const [userResponse, setUserResponse] = useState<UserResponse>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    });

    if (!response.data.user) {
      return alert('로그인에 실패했습니다.');
    }
  };

  useEffect(() => {
    (async () => {
      const user = await supabase.auth.getUser();
      setUserResponse(user);
    })();
  }, []);

  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      {!!userResponse?.data.user ? (
        <div className="flex flex-col gap-2">
          <div className="mb-8">
            <b>{userResponse.data.user.email}</b> 님으로 로그인하셨습니다.
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-800 py-2 text-white"
            onClick={() => router.push('/write')}
          >
            글쓰러가기
          </button>
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-gray-800 py-2 text-white"
            onClick={() => {
              supabase.auth.signOut();
              router.push('/');
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <h1 className="text-2xl font-medium">관리자 로그인</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <Input type="text" ref={emailRef} placeholder="이메일"></Input>
              <Input
                type="password"
                ref={passwordRef}
                placeholder="이메일"
              ></Input>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-gray-800 py-2 text-white"
            >
              로그인
            </button>
          </form>
        </div>
      )}
    </div>
  );
}