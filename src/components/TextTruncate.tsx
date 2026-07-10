import {
  createElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

import type { TextTruncateProps } from "./types";

const buttonStyle: CSSProperties = {
  display: "inline",
  padding: 0,
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
  font: "inherit",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};

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

  const textStyle: CSSProperties = isExpanded
    ? { display: "block", overflow: "visible" }
    : {
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        WebkitLineClamp: lines,
      };

  const showMore = !isExpanded && isTruncated && showMoreLabel;
  const showLess = isExpanded && showLessLabel;

  return (
    <>
      {createElement(
        as,
        {
          ref: elementRef,
          className,
          style: textStyle,
        },
        text,
      )}
      {showMore && (
        <button
          type="button"
          style={buttonStyle}
          onClick={handleToggle}
        >
          {showMoreLabel}
        </button>
      )}
      {showLess && (
        <button
          type="button"
          style={buttonStyle}
          onClick={handleToggle}
        >
          {showLessLabel}
        </button>
      )}
      {textTruncateChild}
    </>
  );
}
