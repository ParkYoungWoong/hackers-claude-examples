import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type Variant = 'primary' | 'secondary' | 'danger'
type Size = 'medium' | 'small'

type ButtonProps = {
  variant?: Variant
  size?: Size
  icon?: string
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  variant = 'primary',
  size = 'medium',
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children != null && <span className="btn__label">{children}</span>}
    </button>
  )
}
