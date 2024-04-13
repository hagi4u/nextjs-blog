import { cx } from 'class-variance-authority';
import { ClassValue } from 'class-variance-authority/types';
import { twMerge } from 'tailwind-merge';

export * from 'class-variance-authority';
export * from 'tailwind-merge';

export const cn = (...args: ClassValue[]) => twMerge(cx(args));
