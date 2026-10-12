import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  form: '',
  editingIndex: null,
}

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    updateSocialForm(state, action) {
      state.form = action.payload
    },
    addOrUpdateSocial(state) {
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
    editSocial(state, action) {
      const index = action.payload
      state.form = state.items[index]
      state.editingIndex = index
    },
    deleteSocial(state, action) {
      const index = action.payload
      state.items.splice(index, 1)
      if (state.editingIndex === index) {
        state.editingIndex = null
        state.form = ''
      }
    },
    hydrateSocial(state, action) {
      state.items = action.payload || []
      state.form = ''
      state.editingIndex = null
    },
  },
})

export const {
  updateSocialForm,
  addOrUpdateSocial,
  editSocial,
  deleteSocial,
  hydrateSocial,
} = socialSlice.actions
export default socialSlice.reducer
