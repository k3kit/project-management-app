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
  useEffect(() => {
    const loginUser = async (user: { name: string; login: string; password: string }) => {
      const rawResponse = await fetch('https://still-dusk-31338.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const content = await rawResponse.json();

      console.log(content);
    };

    loginUser({
      name: 'Vasyasdf',
      login: 'user00ss1',
      password: 'userpass@1sdf23',
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
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
