'use client';

import { useCategories } from '@/utils/hooks';
import { cn } from '@/utils/style';
import Link from 'next/link';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from './IconButton';
import { useSidebar } from './Providers';

const Sidebar: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebar();
  const { data: existingCategories } = useCategories();

  return (
    <div
      className={cn(
        'absolute z-10 min-h-screen flex-col gap-6 border-r bg-white  pl-10 pr-6 pt-10 text-base lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <IconButton
          onClick={() => setIsOpen(false)}
          label="sidebarClose"
          Icon={AiOutlineClose}
        />
      </div>
      <Link
        href="/"
        className="w-full font-medium text-gray-600 hover:underline"
      >
        홈
      </Link>
      <Link
        href="/tag"
        className="w-full font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      {existingCategories?.map((category) => (
        <Link
          href={`/category/${category}`}
          key={category}
          className="w-full font-medium text-gray-600 hover:underline"
        >
          {category}
        </Link>
      ))}

      <div className="mt-10 flex items-center gap-4">
        <IconButton
          href="https://github.com"
          target="_blank"
          label="github"
          onClick={() => setIsOpen(false)}
          Icon={AiFillGithub}
          component={Link}
        />
        <IconButton
          href="https://instagram.com"
          target="_blank"
          onClick={() => setIsOpen(false)}
          label="instagram"
          Icon={AiFillInstagram}
          component={Link}
        />
      </div>
    </div>
  );
};

export default Sidebar;
