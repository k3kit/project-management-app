import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import { Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './pages/welcome-page/welcomePage';
import MainPage from './pages/main-page/mainPage';
import LoginPage from './pages/login-page/loginPage';
import BoardPage from './pages/board-page/boardPage';
import Layout from './components/Layout/Layout';
import { RequireAuth } from './hoc/RequireAuth';
import Register from './pages/login-page/Register';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            path="main"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route
            path="board"
            element={
              <RequireAuth>
                <BoardPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
