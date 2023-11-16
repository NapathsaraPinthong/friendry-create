import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateActivity from './components/CreateActivity';
import HostManage from './components/HostManage';
import logo from './asset/logo.png';
import HostPage from './pages/HostPage';
import EditActivity from './components/EditActivity';

function App() {

  sessionStorage.setItem("userID", 6422782111);

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
                <Link to="/host">Create activity</Link>
              </li>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path='/create' element={<CreateActivity />} />
          <Route path='/manage' element={<HostManage />} />
          <Route path='/host' element={<HostPage />} />
          <Route path='/edit' element={<EditActivity />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
