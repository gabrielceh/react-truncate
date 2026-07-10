# react-truncate

A lightweight, typed React component for truncating text by number of lines, with support for expanding and collapsing content.

Zero external dependencies. Compatible with React 18+.

## Installation

```bash
npm i @gabrielceh/react-truncate
```

## Basic Usage

```tsx
import { TextTruncate } from "react-truncate";

function App() {
  return (
    <TextTruncate
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      lines={3}
      showMoreLabel="Show more"
    />
  );
}
```

## Props

| Prop                | Type                                 | Default     | Description                                        |
| ------------------- | ------------------------------------ | ----------- | -------------------------------------------------- |
| `text`              | `string`                             | —           | Text to render **(required)**                      |
| `lines`             | `number`                             | `1`         | Max lines before truncation                        |
| `as`                | `TextElement`                        | `"p"`       | HTML element that renders the text                 |
| `className`         | `string`                             | `undefined` | Custom CSS class                                   |
| `showMoreLabel`     | `string`                             | `undefined` | Button text to expand content                      |
| `showLessLabel`     | `string`                             | `undefined` | Button text to collapse content                    |
| `textTruncateChild` | `React.ReactNode`                    | `undefined` | React element rendered at the end of the component |

### TextElement

```tsx
type TextElement =
  | "p" | "span" | "a" | "label" | "strong"
  | "small" | "em" | "b" | "i"
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
```

## Behavior

### Without showMoreLabel

The text is permanently truncated with no indicator.

```
Lorem ipsum dolor sit...
```

### showMoreLabel only

A button appears with the label text. On click, the text expands and the button disappears. It cannot be collapsed again.

```
Lorem ipsum dolor sit...
Show more
```

### showMoreLabel + showLessLabel

The component toggles between expanded and collapsed states on click. The button label changes according to the state.

**Collapsed:**
```
Lorem ipsum dolor sit...
Show more
```

**Expanded:**
```
Lorem ipsum dolor sit amet consectetur...
Show less
```

## Overflow Detection

The component automatically detects whether the text actually overflows its container by comparing `scrollHeight` vs `clientHeight`. The button only appears when there is real truncation, regardless of text length.

## Responsive

The component reacts to container resize via `ResizeObserver`. If the text stops truncating on resize, the button disappears.

## Accessibility

The expand and collapse controls are native `<button>` elements, keyboard accessible (Enter and Space) and compatible with screen readers.

## TypeScript Examples

```tsx
import { TextTruncate } from "react-truncate";
import type { TextElement, TextTruncateProps } from "react-truncate";

function App() {
  return (
    <>
      <TextTruncate text="Text truncated to 1 line." />

      <TextTruncate text="Text truncated to 3 lines." lines={3} />

      <TextTruncate
        text="Expand once."
        showMoreLabel="Show more"
      />

      <TextTruncate
        text="Toggle between expanded and collapsed."
        showMoreLabel="Show more"
        showLessLabel="Show less"
      />

      <TextTruncate
        as="h3"
        text="Truncated heading."
        lines={2}
        className="custom-title"
        showMoreLabel="Read more"
        showLessLabel="Show less"
        textTruncateChild={<span> — 5 min read</span>}
      />
    </>
  );
}
```

## Bundle

- Zero external dependencies
- Full TypeScript typings
- Tree-shaking optimized
