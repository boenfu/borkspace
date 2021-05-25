import React, { FC, forwardRef } from 'react';

import style from './style.css';

interface CardProps {
  className?: string;
}

const Card: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div {...props} className={`${className} ${style.card}`} ref={ref}>
        2
      </div>
    );
  }
);
export default Card;
