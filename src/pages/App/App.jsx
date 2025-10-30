import SignupPage from '../SignupPage/SignupPage';
import TicketIndexPage from '../TicketIndexPage/TicketIndexPage';
import TicketDetailPage from '../TicketDetailPage/TicketDetailPage';
import LoginPage from '../LoginPage/LoginPage';
import Navbar from '../../components/NavBar/NavBar';
import './styles.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {/* ثابت أعلى الصفحة */}
      <Navbar user={user} setUser={setUser} />

      {/* كل الصفحات داخل حاوية موحّدة */}
      <main id="app-content" className="app-content">
        <Routes>
          {user ? (
            <>
              <Route path="/*" element={<Navigate to="/home" />} />
              <Route path="/home" element={<LoginPage />} />
              <Route path="/tickets" element={<TicketIndexPage />} />
              <Route path="/tickets/:id" element={<TicketDetailPage />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Navigate to="/home" />} />
              <Route path="/home" element={<LoginPage user={user} setUser={setUser} />} />
              <Route path="/signup" element={<SignupPage user={user} setUser={setUser} />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
