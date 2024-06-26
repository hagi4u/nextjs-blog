import Link from 'next/link';
import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import IconButton from './IconButton';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">ABOUT ME</div>
        <div className="text-xs text-gray-500 lg:text-sm">
          프론트엔드 엔지니어 정명학
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">Admin</div>
        <IconButton
          Icon={AiOutlineSetting}
          component={Link}
          label="admin"
          href="/admin"
          className="text-gray-500 transition-all hover:text-gray-600"
        />
        <IconButton
          Icon={BsPencilSquare}
          component={Link}
          label="write"
          href="/write"
          className="text-gray-500 transition-all hover:text-gray-600"
        />
      </div>
    </footer>
  );
};

export default Footer;
