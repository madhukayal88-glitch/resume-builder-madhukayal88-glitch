import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent, waitFor, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from '../App'
import profileReducer from '../store/profileSlice'
import educationReducer from '../store/educationSlice'
import skillsReducer from '../store/skillsSlice'
import projectsReducer from '../store/projectsSlice'
import socialReducer from '../store/socialSlice'
import navigationReducer from '../store/navigationSlice'

function makeStore() {
  return configureStore({
    reducer: {
      profile: profileReducer,
      education: educationReducer,
      skills: skillsReducer,
      projects: projectsReducer,
      social: socialReducer,
      navigation: navigationReducer,
    },
  })
}

function setInput(container, selector, value) {
  const el = container.querySelector(selector)
  if (!el) throw new Error(`Missing element for selector ${selector}`)
  fireEvent.change(el, { target: { value } })
}

beforeEach(() => {
  localStorage.clear()
})

describe('Resume Builder smoke test', () => {
  it('walks through every page using the required selectors', async () => {
    const store = makeStore()
    const { container, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    await waitFor(() => expect(store.getState().navigation.hasLoadedFromDB).toBe(true))

    // --- Page 1: Profile ---
    setInput(container, '[name="fname"]', 'Kayal')
    setInput(container, '[name="lname"]', 'Madhu')
    setInput(container, '[name="phone"]', '9999999999')
    setInput(container, '[name="address"]', 'Chennai')
    setInput(container, '[name="url"]', 'https://example.com/photo.jpg')
    expect(store.getState().profile.fname).toBe('Kayal')

    fireEvent.click(container.querySelector('#next'))
    expect(store.getState().navigation.step).toBe(2)

    // --- Page 2: Education (add, edit, delete) ---
    setInput(container, '[name="courseName"]', 'B.Tech CSE')
    setInput(container, '[name="college"]', 'Anna University')
    setInput(container, '[name="completionYear"]', '2027')
    setInput(container, '[name="percentage"]', '88')
    fireEvent.click(container.querySelector('#add_education'))
    expect(store.getState().education.items.length).toBe(1)

    fireEvent.click(container.querySelector('.entry-card__body'))
    expect(store.getState().education.editingIndex).toBe(0)
    setInput(container, '[name="college"]', 'Anna University Updated')
    fireEvent.click(container.querySelector('#add_education'))
    expect(store.getState().education.items[0].college).toBe('Anna University Updated')
    expect(store.getState().education.items.length).toBe(1)

    fireEvent.click(container.querySelector('#delete'))
    expect(store.getState().education.items.length).toBe(0)

    setInput(container, '[name="courseName"]', 'B.Tech CSE')
    setInput(container, '[name="college"]', 'Anna University')
    setInput(container, '[name="completionYear"]', '2027')
    setInput(container, '[name="percentage"]', '88')
    fireEvent.click(container.querySelector('#add_education'))
    expect(store.getState().education.items.length).toBe(1)

    fireEvent.click(container.querySelector('#next'))
    expect(store.getState().navigation.step).toBe(3)

    // --- Page 3: Skills (add, delete) ---
    setInput(container, '[name="skill"]', 'React')
    fireEvent.click(container.querySelector('#add_skill'))
    expect(store.getState().skills.items).toEqual(['React'])

    setInput(container, '[name="skill"]', 'Redux')
    fireEvent.click(container.querySelector('#add_skill'))
    expect(store.getState().skills.items).toEqual(['React', 'Redux'])

    fireEvent.click(container.querySelector('#delete_skill'))
    expect(store.getState().skills.items.length).toBe(1)

    fireEvent.click(container.querySelector('#next'))
    expect(store.getState().navigation.step).toBe(4)

    // --- Page 4: Projects (add, delete) ---
    setInput(container, '[name="projectName"]', 'Resume Builder')
    setInput(container, '[name="techStack"]', 'React, Redux')
    setInput(container, '[name="description"]', 'A multi page resume builder')
    fireEvent.click(container.querySelector('#add_project'))
    expect(store.getState().projects.items.length).toBe(1)

    fireEvent.click(container.querySelector('#next'))
    expect(store.getState().navigation.step).toBe(5)

    // --- Page 5: Social (add) then Save & Continue ---
    setInput(container, '[name="Social"]', 'GitHub - https://github.com/madhukayal88-glitch')
    fireEvent.click(container.querySelector('#add_social'))
    expect(store.getState().social.items.length).toBe(1)

    fireEvent.click(container.querySelector('#save_continue'))
    await waitFor(() => expect(store.getState().navigation.step).toBe(6), { timeout: 2000 })

    // --- Page 6: Final resume reflects everything entered ---
    expect(getByText('Kayal Madhu')).toBeTruthy()
    expect(getByText('Redux')).toBeTruthy()
    expect(within(container.querySelector('.resume')).getByText('Resume Builder')).toBeTruthy()

    // --- Back navigation still works from the preview page ---
    fireEvent.click(container.querySelector('#back'))
    expect(store.getState().navigation.step).toBe(5)

    // --- Saved data actually persisted to the "database" (localStorage) ---
    const saved = JSON.parse(localStorage.getItem('resume-builder:resume'))
    expect(saved.profile.fname).toBe('Kayal')
    expect(saved.skills).toEqual(['Redux'])
  })

  it('reloads a previously saved resume from the database on mount', async () => {
    localStorage.setItem(
      'resume-builder:resume',
      JSON.stringify({
        profile: { fname: 'Existing', lname: 'User', phone: '', address: '', url: '' },
        education: [],
        skills: ['Node.js'],
        projects: [],
        social: [],
      }),
    )

    const store = makeStore()
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    await waitFor(() => expect(store.getState().navigation.hasLoadedFromDB).toBe(true))
    expect(store.getState().profile.fname).toBe('Existing')
    expect(store.getState().skills.items).toEqual(['Node.js'])
    expect(container.querySelector('[name="fname"]').value).toBe('Existing')
  })
})
