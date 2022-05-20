import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './component/Layout/Header';
import Footer from './component/Layout/Footer';
import DashBoard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Create from './pages/Create';
import Edit from './pages/Edit';
import UserProjects from './pages/UserProjects';
import Unavailable from './component/Unavailable';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blog" element={<Unavailable />} />
            <Route path="/:id/edit" element={<Edit />} />
            <Route path="/myprojects" element={<UserProjects />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
