import {
  createElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

import type { TextTruncateProps } from "./types";
import "./TextTruncate.css";

export function TextTruncate({
  text,
  lines = 1,
  as = 'p',
  className,
  showMoreLabel,
  showLessLabel,
  labelPosition = 'center',
  textTruncateChild,
  labelhasUnderline = false,
  labelColor = 'inherit',
  labelClassName,
}: TextTruncateProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const checkTruncation = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;
    setIsTruncated(el.scrollHeight > el.clientHeight);
  }, []);

  useLayoutEffect(() => {
    const el = elementRef.current;
    if (!el || isExpanded) return;

    checkTruncation();

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);

    return () => observer.disconnect();
  }, [isExpanded, checkTruncation]);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const classNames =
    [
      'text-truncate',
      isExpanded ? 'text-truncate--expanded' : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  const classNamesButton = [
    labelClassName ?? '',
    'text-truncate__button',
    labelPosition === 'center'
      ? 'text-truncate__button--center'
      : labelPosition === 'right'
        ? 'text-truncate__button--right'
        : labelPosition === 'left'
          ? 'text-truncate__button--left'
          : '',
    labelhasUnderline ? 'text-truncate__button--underline' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const style: CSSProperties = isExpanded ? {} : { WebkitLineClamp: lines };

  const styleLabel: CSSProperties = { color: labelColor };

  const showMore = !isExpanded && isTruncated && showMoreLabel;
  const showLess = isExpanded && showLessLabel;

  return (
    <>
      <div className='text--container'>
        {createElement(
          as,
          {
            ref: elementRef,
            className: classNames,
            style,
          },
          text,
        )}
        {showMore && (
          <button
            type='button'
            className={classNamesButton}
            onClick={handleToggle}
            style={styleLabel}
          >
            {showMoreLabel}
          </button>
        )}
        {showLess && (
          <button
            type='button'
            className={classNamesButton}
            onClick={handleToggle}
            style={styleLabel}
          >
            {showLessLabel}
          </button>
        )}
      </div>
      {textTruncateChild}
    </>
  );
}
