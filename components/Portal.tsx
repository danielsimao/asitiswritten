import { useEffect, useState, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({
  children,
  container
}: PropsWithChildren<{ container?: any }>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [container]);

  return mounted ? createPortal(children, container || document.body) : null;
}
