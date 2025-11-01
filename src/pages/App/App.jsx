import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// PAGES
import SignupPage from '../SignupPage/SignupPage';
import TicketIndexPage from '../TicketIndexPage/TicketIndexPage.jsx';
import TicketFormPage from '../TicketFormPage/TicketFormPage.jsx';
import TicketDetailPage from '../TicketDetailPage/TicketDetailPage.jsx';
import LoginPage from '../LoginPage/LoginPage';
import Navbar from '../../components/NavBar/NavBar';
import './styles.css';


// APIs
import { getUser } from '../../utilities/users-api';



function App() {
  const [managers, setManagers] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function checkUser() {
      const foundUser = await getUser();
      setUser(foundUser)
    }
    checkUser()
  }, [])
  
  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main id="app-content" className="app-content">
        <Routes>
          {user ? (
            <>
              <Route path="/*" element={<Navigate to="/tickets" />} />
              <Route path="/tickets" element={<TicketIndexPage user={user} setUser={setUser} />} />
              <Route path="/tickets/:id" element={<TicketDetailPage />} />
              <Route path="/tickets/new" element={<TicketFormPage profileDetail={user.profile.id}/>}/>
            </>
          ) : (
            <>
              <Route path="/*" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
              <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
