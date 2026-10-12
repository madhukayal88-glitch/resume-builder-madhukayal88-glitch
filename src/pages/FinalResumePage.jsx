import { useSelector } from 'react-redux'

export default function FinalResumePage() {
  const profile = useSelector((state) => state.profile)
  const education = useSelector((state) => state.education.items)
  const skills = useSelector((state) => state.skills.items)
  const projects = useSelector((state) => state.projects.items)
  const social = useSelector((state) => state.social.items)

  const fullName = [profile.fname, profile.lname].filter(Boolean).join(' ') || 'Your name'
  const initials = [profile.fname, profile.lname]
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase())
    .join('') || '—'

  return (
    <div className="page">
      <h2 className="page__title">Your resume</h2>
      <p className="page__hint">This is saved. Go back to any earlier page to make changes, then save again.</p>

      <div className="resume">
        <div className="resume__header">
          {profile.url ? (
            <img className="resume__avatar" src={profile.url} alt={fullName} onError={(e) => (e.target.style.visibility = 'hidden')} />
          ) : (
            <div className="resume__avatar-fallback">{initials}</div>
          )}
          <div>
            <h3 className="resume__name">{fullName}</h3>
            <div className="resume__contact">
              {profile.phone && <span>{profile.phone}</span>}
              {profile.address && <span>{profile.address}</span>}
            </div>
          </div>
        </div>

        <div>
          <div className="resume__section-title">Education</div>
          {education.length === 0 && <p className="resume__sub">No education added.</p>}
          {education.map((item, i) => (
            <div className="resume__edu-item" key={i}>
              <div className="resume__row">
                <span>{item.courseName}</span>
                <span>{item.completionYear}</span>
              </div>
              <p className="resume__sub">
                {item.college}
                {item.percentage ? ` — ${item.percentage}` : ''}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div className="resume__section-title">Skills</div>
          {skills.length === 0 ? (
            <p className="resume__sub">No skills added.</p>
          ) : (
            <div className="chip-row">
              {skills.map((skill, i) => (
                <span className="chip" key={i} style={{ cursor: 'default' }}>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="resume__section-title">Projects</div>
          {projects.length === 0 && <p className="resume__sub">No projects added.</p>}
          {projects.map((item, i) => (
            <div className="resume__project" key={i}>
              <div className="resume__row">
                <span>{item.projectName}</span>
                <span>{item.techStack}</span>
              </div>
              {item.description && <p className="resume__desc">{item.description}</p>}
            </div>
          ))}
        </div>

        <div>
          <div className="resume__section-title">Social</div>
          {social.length === 0 ? (
            <p className="resume__sub">No social links added.</p>
          ) : (
            <div className="resume__social">
              {social.map((link, i) => (
                <span key={i}>{link}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
