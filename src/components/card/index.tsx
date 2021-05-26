import React, { FC, forwardRef } from 'react';

import style from './style.css';

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div {...props} className={`${className} ${style.card}`} ref={ref}>
        {children}
      </div>
    );
  }
);
export default Card;
