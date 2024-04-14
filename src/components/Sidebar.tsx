import { cn } from '@/utils/style';
import Link from 'next/link';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from './IconButton';

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
        <IconButton onClick={close} Icon={AiOutlineClose} />
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
        <IconButton
          href="https://instagram.com"
          target="_blank"
          onClick={close}
          Icon={AiFillGithub}
          component={Link}
        />
        <IconButton
          href="https://instagram.com"
          target="_blank"
          onClick={close}
          Icon={AiFillInstagram}
          component={Link}
        />
      </div>
    </div>
  );
};

export default Sidebar;
