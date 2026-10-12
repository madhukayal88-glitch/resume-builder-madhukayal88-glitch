// Stand-in for a real backend/database call. Swap the two functions below
// for real `fetch` calls to your API and nothing else in the app needs to change.
const DB_KEY = 'resume-builder:resume'

export function saveResumeToDB(resume) {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(DB_KEY, JSON.stringify(resume))
      resolve(resume)
    }, 400)
  })
}

export function loadResumeFromDB() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const raw = localStorage.getItem(DB_KEY)
      resolve(raw ? JSON.parse(raw) : null)
    }, 200)
  })
}
