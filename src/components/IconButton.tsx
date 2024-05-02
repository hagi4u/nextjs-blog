import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, createElement, ElementType } from 'react';
import { IconType } from 'react-icons';

type IconButtonProps<Component extends ElementType> =
  ComponentPropsWithoutRef<Component> & {
    Icon: IconType;
    iconClassName?: string;
    className?: string;
    label: string;
    component?: Component;
  };

const IconButton = <Component extends ElementType = 'button'>({
  component,
  Icon,
  iconClassName,
  className,
  ...props
}: IconButtonProps<Component>) => {
  return createElement(
    component ?? 'button',
    {
      className: cn('p-1.5 lg:p-2', className),
      'data-cy': props.label,
      ...props,
    },
    <Icon
      className={cn('h-5 w-5 transition-all lg:h-6 lg:w-6', iconClassName)}
    />,
  );
};

export default IconButton;
