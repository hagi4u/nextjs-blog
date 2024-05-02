'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Button from './Button';
import Input from './Input';

const supabase = createClient();

const LoginForm = () => {
  const router = useRouter();
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

    router.refresh();
  };
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-medium">관리자 로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input type="text" ref={emailRef} placeholder="이메일"></Input>
          <Input type="password" ref={passwordRef} placeholder="이메일"></Input>
        </div>
        <Button type="submit" className="mt-4 w-full">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
