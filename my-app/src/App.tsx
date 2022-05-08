import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import WelcomePage from './pages/welcome-page/welcomePage';
import MainPage from './pages/main-page/mainPage';
import LoginPage from './pages/login-page/loginPage';
import BoardPage from './pages/board-page/boardPage';
import Layout from './components/Layout/Layout';
function App() {
  // useEffect(() => {
  //   fetch('https://still-dusk-31338.herokuapp.com/users')
  //     .then((res) => res.json())
  //     .then(
  //       (data) => {
  //         console.log(data);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="board" element={<BoardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
