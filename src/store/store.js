import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './profileSlice'
import educationReducer from './educationSlice'
import skillsReducer from './skillsSlice'
import projectsReducer from './projectsSlice'
import socialReducer from './socialSlice'
import navigationReducer from './navigationSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    education: educationReducer,
    skills: skillsReducer,
    projects: projectsReducer,
    social: socialReducer,
    navigation: navigationReducer,
  },
})
