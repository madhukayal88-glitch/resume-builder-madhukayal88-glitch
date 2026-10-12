import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  form: '',
  editingIndex: null,
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    updateSkillForm(state, action) {
      state.form = action.payload
    },
    addOrUpdateSkill(state) {
      const value = state.form.trim()
      if (!value) return
      if (state.editingIndex !== null) {
        state.items[state.editingIndex] = value
        state.editingIndex = null
      } else {
        state.items.push(value)
      }
      state.form = ''
    },
    editSkill(state, action) {
      const index = action.payload
      state.form = state.items[index]
      state.editingIndex = index
    },
    deleteSkill(state, action) {
      const index = action.payload
      state.items.splice(index, 1)
      if (state.editingIndex === index) {
        state.editingIndex = null
        state.form = ''
      }
    },
    hydrateSkills(state, action) {
      state.items = action.payload || []
      state.form = ''
      state.editingIndex = null
    },
  },
})

export const {
  updateSkillForm,
  addOrUpdateSkill,
  editSkill,
  deleteSkill,
  hydrateSkills,
} = skillsSlice.actions
export default skillsSlice.reducer
