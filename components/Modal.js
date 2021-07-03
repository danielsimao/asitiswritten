import { useEffect } from 'react';

export default function Modal(props) {
  const fullscreenClassName = props.fullscreen ? 'inset-0' : '';
  const openClassName = !props.isOpen ? 'hidden' : 'block';

  if (!props.isOpen) {
    return null;
  }

  return (
    <div
      onClick={props?.onClick}
      style={props.style}
      className={`absolute z-50 overflow-hidden bg-white dark:bg-black ${fullscreenClassName} ${openClassName} ${
        props.className || ''
      } `}
    >
      {props.children}
    </div>
  );
}
