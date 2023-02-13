import { Route, Routes } from 'react-router-dom';
import './App.css';
import Contact from './components/Home/Contact/Contact';
import CreateContact from './components/Home/Contact/CreateContact';
import UpdateContact from './components/Home/Contact/UpdateContact';
import Profile from './components/Home/Profile/Profile';
import Login from './components/Login/Login';
import Navbar from './components/NavBar/Navbar';
import Signup from './components/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>

        <Route path='/login' element={<Login />}></Route>

        <Route path='/signup' element={<Signup />}></Route>

        <Route path='/' element={<Profile />}></Route>

        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/profile" element={<Profile />}></Route>

        <Route path='/addcontact' element={<CreateContact />}></Route>

        <Route path='/updatecontact' element={<UpdateContact />}></Route>

      </Routes>
    </div>
  );
}

export default App;
