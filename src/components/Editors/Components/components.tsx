import React from "react";
import { cx, css } from "emotion";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
  reversed?: boolean;
}

export const Button = React.forwardRef<HTMLSpanElement, ButtonProps>(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  )
);

// export const Icon = React.forwardRef(({ className, ...props }, ref) => (
//   <span
//     {...props}
//     ref={ref}
//     className={cx(
//       "material-icons",
//       className,
//       css`
//         font-size: 18px;
//         vertical-align: text-bottom;
//       `
//     )}
//   />
// ));

export const Menu = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    className={cx(
      className,
      css`
        & > * {
          display: inline-block;
        }
        & > * + * {
          margin-left: 15px;
        }
      `
    )}
  />
));

interface ToolbarProps {
  className?: string;
  children?: React.ReactNode;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, ...props }, ref) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 0 5px;
          margin: 0;
          border-bottom: 2px solid #eee;
          margin-bottom: 5px;
        `
      )}
    />
  )
);
