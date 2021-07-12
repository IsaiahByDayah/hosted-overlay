import { useEffect, useState } from "react";

import ProgressBar from "./progressbar";

interface GoalProps {
  className?: string;
  value: number | (() => Promise<number>);
  total: number;
  label: string;
}

const Goal = ({ className, value, total, label }: GoalProps) => {
  const [_value, setValue] = useState<number | undefined>(
    typeof value === "number" ? value : undefined
  );

  const getValue = async (): Promise<number | undefined> => {
    if (typeof value !== "number") {
      try {
        const newValue = await value();
        return newValue;
      } catch (e) {
        return _value;
      }
    } else {
      return value;
    }
  };

  const updateValue = async () => {
    const newValue = await getValue();
    setValue(newValue);
  };

  useEffect(() => {
    const interval = window.setInterval(updateValue, 1000 * 60);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  if (!_value) return null;

  return (
    <div className={`${className} goal-root`}>
      <p className="bold small-text">
        {_value} / {total}
      </p>
      <ProgressBar
        className="goal-progress-bar"
        percent={(_value / total) * 100}
      />
      <p className="bold medium-text">{label}</p>
    </div>
  );
};

export default Goal;
