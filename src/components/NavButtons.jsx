import { useDispatch, useSelector } from 'react-redux'
import { goBack, goNext } from '../store/navigationSlice'
import { saveAndContinue } from '../store/resumeThunks'

export default function NavButtons() {
  const dispatch = useDispatch()
  const step = useSelector((state) => state.navigation.step)
  const saveStatus = useSelector((state) => state.navigation.saveStatus)

  const isFirst = step === 1
  const isLastForm = step === 5
  const isPreview = step === 6

  return (
    <div className="nav-row">
      {!isFirst ? (
        <button id="back" type="button" className="btn btn--ghost" onClick={() => dispatch(goBack())}>
          Back
        </button>
      ) : (
        <span />
      )}

      <div className="nav-row__spacer" />

      {isLastForm && saveStatus === 'saving' && <span className="save-status">Saving…</span>}

      {!isPreview && !isLastForm && (
        <button id="next" type="button" className="btn btn--primary" onClick={() => dispatch(goNext())}>
          Next
        </button>
      )}

      {isLastForm && (
        <button
          id="save_continue"
          type="button"
          className="btn btn--primary"
          disabled={saveStatus === 'saving'}
          onClick={() => dispatch(saveAndContinue())}
        >
          Save & Continue
        </button>
      )}
    </div>
  )
}
