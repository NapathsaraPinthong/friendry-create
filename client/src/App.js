import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateActivity from './components/CreateActivity';
import HostManage from './components/HostManage';
import logo from './asset/logo.png';

function App() {

  sessionStorage.setItem("userID", 6422782555);

  return (
    <div className="body-container">
      <BrowserRouter>

        <div className='header'>
          <div className='logo'>
            <img src={logo} alt="Logo" width="150" />
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/host">Group</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path='/create' element={<CreateActivity />} />
          <Route path='/host' element={<HostManage />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
