import { saveResumeToDB, loadResumeFromDB } from './persistence'
import { hydrateProfile } from './profileSlice'
import { hydrateEducation } from './educationSlice'
import { hydrateSkills } from './skillsSlice'
import { hydrateProjects } from './projectsSlice'
import { hydrateSocial } from './socialSlice'
import { setSaveStatus, markLoaded, goNext } from './navigationSlice'

export function loadResume() {
  return async function (dispatch) {
    const saved = await loadResumeFromDB()
    if (saved) {
      dispatch(hydrateProfile(saved.profile || {}))
      dispatch(hydrateEducation(saved.education || []))
      dispatch(hydrateSkills(saved.skills || []))
      dispatch(hydrateProjects(saved.projects || []))
      dispatch(hydrateSocial(saved.social || []))
    }
    dispatch(markLoaded())
  }
}

export function saveAndContinue() {
  return async function (dispatch, getState) {
    dispatch(setSaveStatus('saving'))
    const state = getState()
    const resume = {
      profile: state.profile,
      education: state.education.items,
      skills: state.skills.items,
      projects: state.projects.items,
      social: state.social.items,
    }
    await saveResumeToDB(resume)
    dispatch(setSaveStatus('saved'))
    dispatch(goNext())
  }
}
