import { useEffect, useMemo, useState } from "react";
import { FlipClockNumber } from "./FlipClockNumber";
import "./style.css";

interface FlipClockProps {
    countDownDate: Date;
}

const FlipClock = ({ countDownDate }: FlipClockProps) => {
    const [timeDifference, setTimeDifference] = useState<number>(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      const timeDifferenceInSeconds =
        (countDownDate.getTime() - new Date().getTime()) / 1000;
      setTimeDifference(
        timeDifferenceInSeconds > 0 ? timeDifferenceInSeconds : 0
      );
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [timeDifference, countDownDate]);

  interface TimeDifferencePerBlock {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  }

  const timeDifferencePerBlock = useMemo<TimeDifferencePerBlock>(() => {
    const days = Math.floor(timeDifference / (3600 * 24));
    const hours = Math.floor((timeDifference % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = Math.floor(timeDifference % 60);

    const fixSizeToMinimalTwoDigits = (number: number): string =>
      number <= 9 ? `0${number}` : `${number}`;

    return {
      days: fixSizeToMinimalTwoDigits(days),
      hours: fixSizeToMinimalTwoDigits(hours),
      minutes: fixSizeToMinimalTwoDigits(minutes),
      seconds: fixSizeToMinimalTwoDigits(seconds)
    };
  }, [timeDifference]);

    return (
        <div className="flipClock">
            <div className="flipClock-block">
                <span className="flipClock-block__title">Days</span>
                <div className="flipClock-block__numbers">
                    <FlipClockNumber value={timeDifferencePerBlock.days[0]} />
                    <FlipClockNumber value={timeDifferencePerBlock.days[1]} />
                </div>
            </div>
            <div className="flipClock-block flipClock-block--separator flipClock-block--separator--days">
                <span className="flipClock-block__title">-</span>
            </div>
            <div className="flipClock-block">
                <span className="flipClock-block__title">Hours</span>
                <div className="flipClock-block__numbers">
                    <FlipClockNumber value={timeDifferencePerBlock.hours[0]} />
                    <FlipClockNumber value={timeDifferencePerBlock.hours[1]} />
                </div>
            </div>
            <div className="flipClock-block flipClock-block--separator">
                <span className="flipClock-block__title">:</span>
            </div>
            <div className="flipClock-block">
                <span className="flipClock-block__title">Minutes</span>
                <div className="flipClock-block__numbers">
                    <FlipClockNumber value={timeDifferencePerBlock.minutes[0]} />
                    <FlipClockNumber value={timeDifferencePerBlock.minutes[1]} />
                </div>
            </div>
            <div className="flipClock-block flipClock-block--separator">
                <span className="flipClock-block__title">:</span>
            </div>
            <div className="flipClock-block">
                <span className="flipClock-block__title">Seconds</span>
                <div className="flipClock-block__numbers">
                    <FlipClockNumber value={timeDifferencePerBlock.seconds[0]} />
                    <FlipClockNumber value={timeDifferencePerBlock.seconds[1]} />
                </div>
            </div>
        </div>
    )
}

export default FlipClock;