import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fname: '',
  lname: '',
  phone: '',
  address: '',
  url: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileField(state, action) {
      const { field, value } = action.payload
      state[field] = value
    },
    hydrateProfile(state, action) {
      return { ...state, ...action.payload }
    },
  },
})

export const { updateProfileField, hydrateProfile } = profileSlice.actions
export default profileSlice.reducer
