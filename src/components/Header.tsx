import Link from 'next/link';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsRobot } from 'react-icons/bs';

const Header: React.FC = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-10">
      <button className="p-2">
        <AiOutlineMenu className="h-5 w-6 lg:h-6 lg:w-6" />
      </button>
      <Link href="/">
        <h1 className="text-3xl font-medium text-slate-600 lg:text-4xl">
          Blog
        </h1>
      </Link>
      <Link href="/posts">
        <BsRobot className="h-5 w-6 lg:h-6 lg:w-6" />
      </Link>
    </header>
  );
};

export default Header;
