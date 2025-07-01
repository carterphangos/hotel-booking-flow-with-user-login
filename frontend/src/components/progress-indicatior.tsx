import "../assets/progress-indicatior.css";

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "SEARCH" },
    { number: 2, label: "SELECT ROOM" },
    { number: 3, label: "CONTACT INFORMATION" },
    { number: 4, label: "CONFIRMATION" },
  ];

  return (
    <div className="progress-indicator">
      <div className="progress-container">
        <div className="steps">
          {steps.map((step, index) => (
            <div key={step.number} className="step-wrapper">
              <div className={`step ${currentStep >= step.number ? "active" : ""}`}>
                <div className="step-number">{step.number}</div>
                <div className="step-label">{step.label}</div>
              </div>
              {index < steps.length - 1 && <div className={`connector ${currentStep > step.number ? "active" : ""}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
