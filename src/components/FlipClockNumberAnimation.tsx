import { memo, useEffect, useState } from "react";
import "./style";

interface FlipClockNumberAnimationProps {
  value: string;
  previousValue: string;
}

export const FlipClockNumberAnimation = memo(
  ({ value, previousValue }: FlipClockNumberAnimationProps) => {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
      setFlip(true);
      const interval = setInterval(() => setFlip(false), 500);
      return () => clearInterval(interval);
    }, [value]);

    return (
      <span
        className={`flipClock-numbers${flip ? " flipClock-numbers--flip" : ""}`}
      >
        <span className="flipClock-number">{value}</span>
        <span className="flipClock-number">{previousValue}</span>
      </span>
    );
  }
);
