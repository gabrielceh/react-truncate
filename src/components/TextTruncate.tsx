import {
  createElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

import type { TextTruncateProps } from "./types";

const STYLES = `.text-truncate{display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}.text-truncate--expanded{display:block;overflow:visible}.text-truncate__button{display:inline;padding:0;border:none;background:none;color:inherit;cursor:pointer;font:inherit;text-decoration:underline;text-underline-offset:2px}`;

let injected = false;

function injectStyles() {
  if (injected) return;
  injected = true;

  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);
}

export function TextTruncate({
  text,
  lines = 1,
  as = "p",
  className,
  showMoreLabel,
  showLessLabel,
  textTruncateChild,
}: TextTruncateProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    injectStyles();
  }, []);

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

  const classNames = [
    "text-truncate",
    isExpanded ? "text-truncate--expanded" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const style: CSSProperties = isExpanded
    ? {}
    : { WebkitLineClamp: lines };

  const showMore = !isExpanded && isTruncated && showMoreLabel;
  const showLess = isExpanded && showLessLabel;

  return (
    <>
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
          type="button"
          className="text-truncate__button"
          onClick={handleToggle}
        >
          {showMoreLabel}
        </button>
      )}
      {showLess && (
        <button
          type="button"
          className="text-truncate__button"
          onClick={handleToggle}
        >
          {showLessLabel}
        </button>
      )}
      {textTruncateChild}
    </>
  );
}
