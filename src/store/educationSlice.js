import { createSlice } from '@reduxjs/toolkit'

const emptyForm = {
  courseName: '',
  completionYear: '',
  college: '',
  percentage: '',
}

const initialState = {
  items: [],
  form: { ...emptyForm },
  editingIndex: null,
}

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    updateEducationForm(state, action) {
      const { field, value } = action.payload
      state.form[field] = value
    },
    addOrUpdateEducation(state) {
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
    editEducation(state, action) {
      const index = action.payload
      state.form = { ...state.items[index] }
      state.editingIndex = index
    },
    deleteEducation(state, action) {
      const index = action.payload
      state.items.splice(index, 1)
      if (state.editingIndex === index) {
        state.editingIndex = null
        state.form = { ...emptyForm }
      }
    },
    hydrateEducation(state, action) {
      state.items = action.payload || []
      state.form = { ...emptyForm }
      state.editingIndex = null
    },
  },
})

export const {
  updateEducationForm,
  addOrUpdateEducation,
  editEducation,
  deleteEducation,
  hydrateEducation,
} = educationSlice.actions
export default educationSlice.reducer
