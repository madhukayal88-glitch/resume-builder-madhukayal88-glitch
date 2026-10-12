import { useDispatch, useSelector } from 'react-redux'
import {
  updateProjectForm,
  addOrUpdateProject,
  editProject,
  deleteProject,
} from '../store/projectsSlice'

export default function ProjectsPage() {
  const dispatch = useDispatch()
  const { items, form, editingIndex } = useSelector((state) => state.projects)

  const handleChange = (field) => (e) => {
    dispatch(updateProjectForm({ field, value: e.target.value }))
  }

  return (
    <div className="page">
      <h2 className="page__title">Projects</h2>
      <p className="page__hint">Show what you've built. Click a project card to edit it.</p>

      <div className="form-block">
        <div className="field-grid">
          <div className="field">
            <label htmlFor="projectName">Project name</label>
            <input id="projectName" name="projectName" type="text" placeholder="Resume Builder" value={form.projectName} onChange={handleChange('projectName')} />
          </div>
          <div className="field">
            <label htmlFor="techStack">Tech stack</label>
            <input id="techStack" name="techStack" type="text" placeholder="React, Redux" value={form.techStack} onChange={handleChange('techStack')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="What the project does and your role in it" value={form.description} onChange={handleChange('description')} />
        </div>
        <div className="form-block__actions">
          <button id="add_project" type="button" className="btn btn--primary btn--small" onClick={() => dispatch(addOrUpdateProject())}>
            {editingIndex !== null ? 'Update project' : 'Add project'}
          </button>
        </div>
      </div>

      <div className="entry-list">
        {items.length === 0 && <div className="empty-state">No projects added yet.</div>}
        {items.map((item, i) => (
          <div className="entry-card" key={i}>
            <div className="entry-card__body" onClick={() => dispatch(editProject(i))}>
              <span className="entry-card__title">{item.projectName || 'Untitled project'}</span>
              <span className="entry-card__meta">{item.techStack}</span>
            </div>
            <div className="entry-card__actions">
              <button id="delete" type="button" className="btn btn--danger" onClick={() => dispatch(deleteProject(i))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
