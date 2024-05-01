import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn(
          'hover:border-grey-400 rounded-md border border-gray-300 p-2 transition-all',
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
