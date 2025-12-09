import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endTime: Date;
  onExpire?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ endTime, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference <= 0) {
        setIsExpired(true);
        onExpire?.();
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onExpire]);

  if (isExpired) {
    return (
      <div className="flex items-center gap-1 text-destructive text-sm font-medium">
        Angebot abgelaufen
      </div>
    );
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-foreground text-background rounded-md px-2 py-1 min-w-[2.5rem] text-center">
        <span className="text-lg font-bold tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-2" data-testid="countdown-timer">
      <TimeBlock value={timeLeft.hours} label="Std" />
      <span className="text-lg font-bold text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <span className="text-lg font-bold text-muted-foreground">:</span>
      <TimeBlock value={timeLeft.seconds} label="Sek" />
    </div>
  );
}
