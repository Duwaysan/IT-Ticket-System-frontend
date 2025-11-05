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
import { getUser, getManagers } from '../../utilities/users-api';



function App() {
  const [managers, setManagers] = useState([]);
  const [user, setUser] = useState(null);
  const [checkedUser, setCheckedUser] = useState(false);
  
  useEffect(() => {
    async function checkUser() {
      const foundUser = await getUser();
      setUser(foundUser)
      const managersData =  await getManagers();
      setManagers(managersData);
      setCheckedUser(true);
    }
    checkUser()
  }, [])


  if(!checkedUser){
    return <h3>Loading...</h3>
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main id="app-content" className="app-content">
        <Routes>
          {user ? (
            <>
              <Route path="/*"                            element={<Navigate to="/tickets" />} />
              <Route path="/tickets"                      element={<TicketIndexPage user={user} setUser={setUser} />} />
              <Route path="/tickets/:id"                  element={<TicketDetailPage user={user}/>} />
              <Route path="/tickets/new"                  element={<TicketFormPage createTicket={true} profileDetail={user.profile} managersList={managers} />}/>
              <Route path="/tickets/edit/:id"             element={<TicketFormPage editTicket={true}   profileDetail={user.profile} managersList={managers} />}/>
              <Route path="/tickets/confirm_delete/:id"   element={<TicketFormPage deleteTicket={true} profileDetail={user.profile} managersList={managers} />}/>
            </>
          ) : (
            <>
              <Route path="/*"                            element={<Navigate to="/login" />} />
              <Route path="/login"                        element={<LoginPage user={user} setUser={setUser} />} />
              <Route path="/signup"                       element={<SignupPage user={user} setUser={setUser} />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
