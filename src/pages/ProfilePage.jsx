import { useDispatch, useSelector } from 'react-redux'
import { updateProfileField } from '../store/profileSlice'

const FIELDS = [
  { name: 'fname', label: 'First name', placeholder: 'Kayal' },
  { name: 'lname', label: 'Last name', placeholder: 'Madhu' },
  { name: 'phone', label: 'Phone', placeholder: '+91 90000 00000' },
  { name: 'address', label: 'Address', placeholder: 'City, State' },
  { name: 'url', label: 'Profile image URL', placeholder: 'https://…/photo.jpg' },
]

export default function ProfilePage() {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  const handleChange = (field) => (e) => {
    dispatch(updateProfileField({ field, value: e.target.value }))
  }

  return (
    <div className="page">
      <h2 className="page__title">Profile</h2>
      <p className="page__hint">Start with the basics. This appears at the top of your resume.</p>

      <div className="field-grid">
        {FIELDS.map((f) => (
          <div className="field" key={f.name} style={f.name === 'address' || f.name === 'url' ? { gridColumn: '1 / -1' } : undefined}>
            <label htmlFor={f.name}>{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type="text"
              placeholder={f.placeholder}
              value={profile[f.name]}
              onChange={handleChange(f.name)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
