import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  step: 1,
  totalSteps: 6,
  saveStatus: 'idle',
  hasLoadedFromDB: false,
}

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    goNext(state) {
      if (state.step < state.totalSteps) state.step += 1
    },
    goBack(state) {
      if (state.step > 1) state.step -= 1
    },
    goToStep(state, action) {
      state.step = action.payload
    },
    setSaveStatus(state, action) {
      state.saveStatus = action.payload
    },
    markLoaded(state) {
      state.hasLoadedFromDB = true
    },
  },
})

export const { goNext, goBack, goToStep, setSaveStatus, markLoaded } = navigationSlice.actions
export default navigationSlice.reducer
