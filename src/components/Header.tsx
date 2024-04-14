import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsRobot } from 'react-icons/bs';
import IconButton from './IconButton';

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-10">
      <IconButton
        Icon={isSidebarOpen ? AiOutlineClose : AiOutlineMenu}
        onClick={() => setIsSidebarOpen((t) => !t)}
        className="p-2"
      />

      <Link href="/">
        <h1 className="text-3xl font-medium text-slate-600 lg:text-4xl">
          Blog
        </h1>
      </Link>
      <IconButton href="/search" component={Link} Icon={BsRobot} />
    </header>
  );
};

export default Header;
