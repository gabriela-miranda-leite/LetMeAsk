import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
  acceptModal?: boolean
  cancelModal?: boolean
};

export function Button({cancelModal=false, acceptModal= false, isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
      className={`button ${isOutlined ? 'outlined' : ''} ${acceptModal ? 'acceptModal' : ''} ${cancelModal ? 'cancelModal' : ''}`}
      {...props}
    />
  )
}