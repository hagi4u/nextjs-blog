import { cn } from '@/utils/style';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { AiFillGithub, AiFillInstagram, AiOutlineClose } from 'react-icons/ai';
import IconButton from './IconButton';

type SidebarProps = {
  close: () => void;
  isOpen: boolean;
};

const supabase = createClient();

const Sidebar: React.FC<SidebarProps> = ({ isOpen, close }) => {
  const { data: existingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.from('Post').select('category');
      return Array.from(new Set(data?.map((d) => d.category)));
    },
  });

  return (
    <div
      className={cn(
        'absolute z-10 min-h-screen flex-col gap-6 border-r bg-white  pl-10 pr-6 pt-10 text-base lg:relative',
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
      {existingCategories?.map((category) => (
        <Link
          href={`/category/${category}`}
          key={category}
          className="w048 text-gray-660 font-medium hover:underline"
        >
          {category}
        </Link>
      ))}

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
