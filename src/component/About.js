import { React, useEffect, useContext } from 'react';
import NoteContext from '../Context/NoteContext';

export default function About() {
  const a = useContext(NoteContext);
  useEffect(() => {
    a.update();
     // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>My name is {a.state.name} and was studied in {a.state.class}</h1>
    </div>
  )
}
