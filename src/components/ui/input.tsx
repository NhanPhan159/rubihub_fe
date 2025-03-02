import { forwardRef } from "react";

const style = {
  display: 'flex',
  width: '100%',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  padding: "2px 6px",
  fontSize: '1rem',
  lineHeight: '1.5',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  transitionProperty: 'color, background-color, border-color, text-decoration-color, fill, stroke',
  transitionTimingFunction: 'ease-in-out',
  transitioDduration: '150ms'
}
const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ ...props }, ref) => {
    return (
      <input ref={ref} {...props} style={style} />
    )
  }
)

export default Input;