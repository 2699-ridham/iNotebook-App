import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './Context/NoteState';
import Alert from './component/Alert';
function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="this is amazing project"/>
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
