import { cn } from '@/utils/style';
import Link from 'next/link';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';

type SidebarProps = {
  close: () => void;
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, close }) => {
  return (
    <div
      className={cn(
        'absolute min-h-screen flex-col gap-6 border-r bg-white  pl-10 pr-6 pt-10 text-base lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <AiOutlineClose className="h-5 w-5" onClick={close} />
      </div>
      <Link href="/" className="w048 text-gray-660 font-medium hover:underline">
        홈
      </Link>
      <Link
        href="/tag"
        className="w048 text-gray-660 font-medium hover:underline"
      >
        태그
      </Link>
      <Link
        href="/category/Web-Development"
        className="w048 text-gray-660 font-medium hover:underline"
      >
        Web Development
      </Link>
      <div className="item-center mt-10 flex gap-4">
        <Link href="https://instagram.com" target="_blank">
          <AiFillGithub />
        </Link>
        <Link href="https://instagram.com" target="_blank">
          <AiFillInstagram />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
