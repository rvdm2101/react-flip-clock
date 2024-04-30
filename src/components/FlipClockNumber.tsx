import { memo } from "react";
import usePrevious from "../utils/usePrevious";
import { FlipClockNumberAnimation } from "./FlipClockNumberAnimation";
import "../assets/flipClock.css";

interface FlipClockNumberProps {
  value: string;
}

export const FlipClockNumber = memo(({ value }: FlipClockNumberProps) => {
  const previousValue = usePrevious<string>(value);

  return (
    <span className="flipClock-number">
      <FlipClockNumberAnimation
        value={value}
        previousValue={previousValue ?? value}
      />
    </span>
  );
});
