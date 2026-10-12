import { createSlice } from '@reduxjs/toolkit'

const emptyForm = {
  projectName: '',
  techStack: '',
  description: '',
}

const initialState = {
  items: [],
  form: { ...emptyForm },
  editingIndex: null,
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProjectForm(state, action) {
      const { field, value } = action.payload
      state.form[field] = value
    },
    addOrUpdateProject(state) {
      const hasContent = Object.values(state.form).some((v) => String(v).trim() !== '')
      if (!hasContent) return
      if (state.editingIndex !== null) {
        state.items[state.editingIndex] = { ...state.form }
        state.editingIndex = null
      } else {
        state.items.push({ ...state.form })
      }
      state.form = { ...emptyForm }
    },
    editProject(state, action) {
      const index = action.payload
      state.form = { ...state.items[index] }
      state.editingIndex = index
    },
    deleteProject(state, action) {
      const index = action.payload
      state.items.splice(index, 1)
      if (state.editingIndex === index) {
        state.editingIndex = null
        state.form = { ...emptyForm }
      }
    },
    hydrateProjects(state, action) {
      state.items = action.payload || []
      state.form = { ...emptyForm }
      state.editingIndex = null
    },
  },
})

export const {
  updateProjectForm,
  addOrUpdateProject,
  editProject,
  deleteProject,
  hydrateProjects,
} = projectsSlice.actions
export default projectsSlice.reducer
