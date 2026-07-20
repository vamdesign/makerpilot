import type { ReactNode } from 'react';
import { screenHeaderClassName } from './screenLayout';

export default function ScreenHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={screenHeaderClassName(className)}>{children}</div>;
}
