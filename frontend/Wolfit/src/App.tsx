import React, { useState } from 'react';
import LoginComponent from './components/LoginComponent';

import ManagerOptionsComponent from './components/ManagerOptionsComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header>
        <div className="header">
          <img src="/public/Wolfit.webp" alt="Wolfit Logo" />
          <h1>ניהול</h1>
          {!isLoggedIn ? (
            <LoginComponent onLoginSuccess={handleLoginSuccess} />
          ) : (
            <div>
              <h2>Welcome!</h2>
              <ManagerOptionsComponent />
              <button onClick={handleLogout}>Logout</button>
              {/* Render other components when logged in */}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default App;
