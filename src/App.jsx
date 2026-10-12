import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Stepper from './components/Stepper'
import NavButtons from './components/NavButtons'
import ProfilePage from './pages/ProfilePage'
import EducationPage from './pages/EducationPage'
import SkillsPage from './pages/SkillsPage'
import ProjectsPage from './pages/ProjectsPage'
import SocialPage from './pages/SocialPage'
import FinalResumePage from './pages/FinalResumePage'
import { loadResume } from './store/resumeThunks'

const PAGES = {
  1: ProfilePage,
  2: EducationPage,
  3: SkillsPage,
  4: ProjectsPage,
  5: SocialPage,
  6: FinalResumePage,
}

export default function App() {
  const dispatch = useDispatch()
  const step = useSelector((state) => state.navigation.step)

  useEffect(() => {
    dispatch(loadResume())
  }, [dispatch])

  const PageComponent = PAGES[step]

  return (
    <div className="sheet">
      <div className="sheet__header">
        <h1>Resume Builder</h1>
        <p>Fill in each section, then save to compile your resume.</p>
      </div>
      <Stepper />
      <PageComponent />
      <NavButtons />
    </div>
  )
}
