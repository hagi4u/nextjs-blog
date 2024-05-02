'use client';

import Link from 'next/link';
import React from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import IconButton from './IconButton';
import { useSidebar } from './Providers';

const Header: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-10">
      <IconButton
        Icon={isOpen ? AiOutlineClose : AiOutlineMenu}
        onClick={() => setIsOpen((t) => !t)}
        label="sidebarToggle"
        className="p-2"
      />

      <Link href="/">
        <h1 className="text-3xl font-medium text-slate-600 lg:text-4xl">
          Blog
        </h1>
      </Link>
    </header>
  );
};

export default Header;
