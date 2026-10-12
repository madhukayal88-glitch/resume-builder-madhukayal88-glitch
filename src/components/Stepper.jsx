import { useSelector } from 'react-redux'

const LABELS = ['Profile', 'Education', 'Skills', 'Projects', 'Social', 'Preview']

export default function Stepper() {
  const step = useSelector((state) => state.navigation.step)

  return (
    <div className="stepper">
      {LABELS.map((label, i) => {
        const num = i + 1
        const isActive = num === step
        const isComplete = num < step
        return (
          <div
            key={label}
            className={`stepper__item ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}
          >
            <span className="stepper__dot">{isComplete ? '✓' : num}</span>
            <span className="stepper__label">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
