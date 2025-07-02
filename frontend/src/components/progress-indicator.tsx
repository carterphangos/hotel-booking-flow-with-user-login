import "../assets/progress-indicator.css";
import { STEPS } from "../constants/steps";

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="progress-indicator">
      <div className="progress-container">
        <div className="steps">
          {STEPS.map((step, index) => (
            <div key={step.number} className="step-wrapper">
              <div className={`step ${currentStep >= step.number ? "active" : ""}`}>
                <div className="step-number">{step.number}</div>
                <div className="step-label">{step.label}</div>
              </div>
              {index < STEPS.length - 1 && <div className={`connector ${currentStep > step.number ? "active" : ""}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
