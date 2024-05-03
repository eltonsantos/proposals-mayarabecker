import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from "@/components/ui/button"
import { FaSpinner } from 'react-icons/fa'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function ButtonLogin ({ loading, children, ...props }: ButtonProps) {
  return (
    <Button {...props} disabled={loading} className='w-full mt-2 bg-blue-900'>
      {loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : children}
    </Button>
  );
};