interface ProgressBarProps {
  className?: string;
  percent: number;
}

const ProgressBar = ({ className, percent = 0 }: ProgressBarProps) => (
  <div className={`${className} rounded shadow progress-root`}>
    <div className="progress-fill" style={{ width: `${percent}%` }} />
  </div>
);

export default ProgressBar;
