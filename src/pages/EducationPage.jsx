import { useDispatch, useSelector } from 'react-redux'
import {
  updateEducationForm,
  addOrUpdateEducation,
  editEducation,
  deleteEducation,
} from '../store/educationSlice'

export default function EducationPage() {
  const dispatch = useDispatch()
  const { items, form, editingIndex } = useSelector((state) => state.education)

  const handleChange = (field) => (e) => {
    dispatch(updateEducationForm({ field, value: e.target.value }))
  }

  return (
    <div className="page">
      <h2 className="page__title">Education</h2>
      <p className="page__hint">Add every qualification worth listing — you can edit or remove any of them later.</p>

      <div className="form-block">
        <div className="field-grid">
          <div className="field">
            <label htmlFor="courseName">Course / degree</label>
            <input id="courseName" name="courseName" type="text" placeholder="B.Tech in CSE" value={form.courseName} onChange={handleChange('courseName')} />
          </div>
          <div className="field">
            <label htmlFor="college">College / school</label>
            <input id="college" name="college" type="text" placeholder="Anna University" value={form.college} onChange={handleChange('college')} />
          </div>
          <div className="field">
            <label htmlFor="completionYear">Completion year</label>
            <input id="completionYear" name="completionYear" type="text" placeholder="2027" value={form.completionYear} onChange={handleChange('completionYear')} />
          </div>
          <div className="field">
            <label htmlFor="percentage">Percentage / GPA</label>
            <input id="percentage" name="percentage" type="text" placeholder="88%" value={form.percentage} onChange={handleChange('percentage')} />
          </div>
        </div>
        <div className="form-block__actions">
          <button id="add_education" type="button" className="btn btn--primary btn--small" onClick={() => dispatch(addOrUpdateEducation())}>
            {editingIndex !== null ? 'Update entry' : 'Add education'}
          </button>
        </div>
      </div>

      <div className="entry-list">
        {items.length === 0 && <div className="empty-state">No education added yet.</div>}
        {items.map((item, i) => (
          <div className="entry-card" key={i}>
            <div className="entry-card__body" onClick={() => dispatch(editEducation(i))}>
              <span className="entry-card__title">{item.courseName || 'Untitled course'}</span>
              <span className="entry-card__meta">
                {[item.college, item.completionYear, item.percentage].filter(Boolean).join(', ')}
              </span>
            </div>
            <div className="entry-card__actions">
              <button id="delete" type="button" className="btn btn--danger" onClick={() => dispatch(deleteEducation(i))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
