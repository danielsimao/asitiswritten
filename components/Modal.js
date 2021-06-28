export default function Modal(props) {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-hidden bg-white dark:bg-black ${
        !props.isOpen ? 'hidden' : 'block'
      }`}
    >
      {props.children}
    </div>
  );
}
