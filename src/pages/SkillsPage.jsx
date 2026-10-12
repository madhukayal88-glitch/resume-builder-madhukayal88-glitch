import { useDispatch, useSelector } from 'react-redux'
import { updateSkillForm, addOrUpdateSkill, editSkill, deleteSkill } from '../store/skillsSlice'

export default function SkillsPage() {
  const dispatch = useDispatch()
  const { items, form, editingIndex } = useSelector((state) => state.skills)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addOrUpdateSkill())
  }

  return (
    <div className="page">
      <h2 className="page__title">Skills</h2>
      <p className="page__hint">Add one skill at a time. Click a skill below to edit it.</p>

      <form className="form-block" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="skill">Skill</label>
          <input
            id="skill"
            name="skill"
            type="text"
            placeholder="React"
            value={form}
            onChange={(e) => dispatch(updateSkillForm(e.target.value))}
          />
        </div>
        <div className="form-block__actions">
          <button id="add_skill" type="submit" className="btn btn--primary btn--small">
            {editingIndex !== null ? 'Update skill' : 'Add skill'}
          </button>
        </div>
      </form>

      <div className="chip-row">
        {items.length === 0 && <div className="empty-state">No skills added yet.</div>}
        {items.map((skill, i) => (
          <span className="chip" key={i} onClick={() => dispatch(editSkill(i))}>
            {skill}
            <button
              id="delete_skill"
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                dispatch(deleteSkill(i))
              }}
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
