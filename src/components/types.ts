export type TextElement =
  | "p"
  | "span"
  | "a"
  | "label"
  | "strong"
  | "small"
  | "em"
  | "b"
  | "i"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface TextTruncateProps {
  text: string;
  lines?: number;
  as?: TextElement;
  className?: string;
  showMoreLabel?: string;
  showLessLabel?: string;
  textTruncateChild?: React.ReactNode;
}
