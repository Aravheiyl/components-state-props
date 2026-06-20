import React from 'react';
import CounterCard from '@/components/CounterCard';


type CounterProps = {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
};


export default function Counter({ count, onIncrement, onDecrement, onReset }: CounterProps) {
  return (
    <CounterCard
      count={count}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onReset={onReset}
    />
  );
}
