import Link from 'next/link';
import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="item-center flex gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">ABOUT ME</div>
        <div className="text-grey-500 text-xs lg:text-sm">
          프론트엔드 엔지니어 정명학
        </div>
      </div>
      <div className="item-center flex gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">Admin</div>
        <Link href="/admin">
          <AiOutlineSetting className="h-5 w-5 text-gray-500 transition-all hover:text-gray-600 lg:h-6 lg:w-6" />
        </Link>
        <Link href="/write">
          <BsPencilSquare className="h-5 w-5 text-gray-500 transition-all hover:text-gray-600 lg:h-6 lg:w-6" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
