import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsRobot } from 'react-icons/bs';

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-10">
      <button onClick={() => setIsSidebarOpen((t) => !t)} className="p-2">
        {isSidebarOpen ? (
          <AiOutlineClose className="h-5 w-6 lg:h-6 lg:w-6" />
        ) : (
          <AiOutlineMenu className="h-5 w-6 lg:h-6 lg:w-6" />
        )}
      </button>
      <Link href="/">
        <h1 className="text-3xl font-medium text-slate-600 lg:text-4xl">
          Blog
        </h1>
      </Link>
      <Link href="/search">
        <BsRobot className="h-5 w-6 lg:h-6 lg:w-6" />
      </Link>
    </header>
  );
};

export default Header;
