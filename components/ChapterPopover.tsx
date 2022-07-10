import { Popover } from '@headlessui/react';
import React, {
  forwardRef,
  KeyboardEventHandler,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import { BibleBook } from '../data/bible-books';

type State = {
  active: number;
  selected: number;
  open: boolean;
};

type Action =
  | { type: 'NEXT' | 'PREVIOUS' | 'PAUSE' | 'CONTINUE' }
  | { type: 'SET'; payload: { selected: number; open: boolean } };

const initialState: State = {
  active: -1,
  selected: -1,
  open: false
};

function popoverReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NEXT':
      return { ...state, active: state.active + 1 };
    case 'PREVIOUS':
      return { ...state, active: state.active - 1 };
    case 'PAUSE':
      return { ...state, open: false, active: state.selected };
    case 'CONTINUE':
      return { ...state, open: true };
    case 'SET':
      return {
        ...state,
        ...action.payload,
        active: action.payload.selected
      };
  }
}

type Props = {
  inputClassName?: string;
  book?: BibleBook;
};

type NativeAttrs = Omit<React.InputHTMLAttributes<unknown>, keyof Props>;

type ChapterPopoverProps = Props & NativeAttrs;

const ChapterPopover = forwardRef<HTMLInputElement, ChapterPopoverProps>(
  ({ className, book, inputClassName, ...props }, ref) => {
    const [state, dispatch] = useReducer(popoverReducer, initialState);
    const [value, setValue] = useState('');
    const optiosContainerRef = useRef<HTMLDivElement>(null);
    const options = [...Array(book?.chapters).fill(null)].map((_, i) => i + 1);

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight': {
          if (!state.open && e.key === 'ArrowDown') {
            dispatch({ type: 'CONTINUE' });
            break;
          }

          if (state.open && options.length - 1 > state.active) {
            e.preventDefault();

            dispatch({ type: 'NEXT' });
            break;
          }

          break;
        }
        case 'ArrowUp':
        case 'ArrowLeft': {
          if (state.open && state.active > 0) {
            e.preventDefault();
            dispatch({ type: 'PREVIOUS' });
          }

          break;
        }
        case 'Escape': {
          dispatch({ type: 'PAUSE' });
          break;
        }
        case 'Enter': {
          if (state.active !== -1) {
            setValue((state.active + 1).toString());
            dispatch({
              type: 'SET',
              payload: { open: false, selected: state.active }
            });
            break;
          }
        }
      }

      // if (!e.isDefaultPrevented()) {
      //   const container = optiosContainerRef.current?.parentElement;
      //   if (!container) return;

      //   window.requestAnimationFrame(() => {
      //     const element = container.querySelector(
      //       `button[data-value="${state.active}"]`
      //     ) as HTMLButtonElement;

      //     if (element) {
      //       console.log(element);
      //       const top = element.offsetTop - container.scrollTop;
      //       const bottom =
      //         container.scrollTop +
      //         container.clientHeight -
      //         (element.offsetTop + element.clientHeight);

      //       if (bottom < 0) container.scrollTop -= bottom;
      //       if (top < 0) container.scrollTop += top;
      //     }
      //   });
      // }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = () =>
      dispatch({ type: 'CONTINUE' });

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
      dispatch({ type: 'PAUSE' });
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const value = e.target.value;
      setValue(value);

      const btn = optiosContainerRef.current?.querySelector(
        `button[data-value="${value}"]`
      );

      if (!btn) {
        return dispatch({ type: 'SET', payload: { open: true, selected: -1 } });
      }

      return dispatch({
        type: 'SET',
        payload: { open: true, selected: Number(value) - 1 }
      });
    };

    return (
      <Popover className={className}>
        <input
          ref={ref}
          value={value}
          className={inputClassName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          {...props}
        />
        {book && state.open && (
          <Popover.Panel
            static
            className="absolute left-0 right-0 top-full z-10 mt-1"
          >
            <div className="max-h-[280px] overflow-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div
                ref={optiosContainerRef}
                className="relative grid grid-cols-6 gap-7 bg-white p-7"
              >
                {options.map((item, idx) => (
                  <button
                    key={item}
                    data-index={idx}
                    data-value={idx + 1}
                    className={`rounded-full p-2 text-base text-gray-900 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-slate-400 focus-visible:ring-opacity-50 ${
                      idx === state.active ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </Popover.Panel>
        )}
      </Popover>
    );
  }
);

ChapterPopover.displayName = 'chapter-input';

export default ChapterPopover;
