import "../css/ProgressCircle.css";

interface ProgressCircleProp {
  progress: number;
}

const ProgressCircle = ({ progress }: ProgressCircleProp) => {
  return (
    <svg className="progress-bar-circle" viewBox="0 0 36 36">
      <circle className="progress-bar-bg" />
      <text className="progress-text">{progress}%</text>
      <circle className="progress-bar-progress-bg" />
      <circle
        className="progress-bar-progress"
        strokeDasharray={`${progress} ${100 - progress}`}
      />
    </svg>
  );
};

export default ProgressCircle;
