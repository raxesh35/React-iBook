import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext);
  return (
    <div>
      {/* About Page - {a.name} age is {a.age} */}
      About Page
    </div>
  )
}

export default About
