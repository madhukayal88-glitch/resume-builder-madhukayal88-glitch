import { useDispatch, useSelector } from 'react-redux'
import { updateSocialForm, addOrUpdateSocial, editSocial, deleteSocial } from '../store/socialSlice'

export default function SocialPage() {
  const dispatch = useDispatch()
  const { items, form, editingIndex } = useSelector((state) => state.social)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addOrUpdateSocial())
  }

  return (
    <div className="page">
      <h2 className="page__title">Social media</h2>
      <p className="page__hint">Add a link per line, e.g. "LinkedIn - https://linkedin.com/in/you". Click a link to edit it.</p>

      <form className="form-block" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="Social">Link</label>
          <input
            id="Social"
            name="Social"
            type="text"
            placeholder="GitHub - https://github.com/you"
            value={form}
            onChange={(e) => dispatch(updateSocialForm(e.target.value))}
          />
        </div>
        <div className="form-block__actions">
          <button id="add_social" type="submit" className="btn btn--primary btn--small">
            {editingIndex !== null ? 'Update link' : 'Add link'}
          </button>
        </div>
      </form>

      <div className="entry-list">
        {items.length === 0 && <div className="empty-state">No social links added yet.</div>}
        {items.map((item, i) => (
          <div className="entry-card" key={i}>
            <div className="entry-card__body" onClick={() => dispatch(editSocial(i))}>
              <span className="entry-card__title">{item}</span>
            </div>
            <div className="entry-card__actions">
              <button type="button" className="btn btn--danger" onClick={() => dispatch(deleteSocial(i))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
