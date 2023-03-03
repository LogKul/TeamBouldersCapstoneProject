import React, { useEffect, useState, useContext } from "react"
import { Router, Routes, Route } from 'react-router-dom';

import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import Landing from "./components/pages/Landing"
import Home from "./components/pages/Home"
import Account from "./components/pages/Account"
import Settings from "./components/pages/Settings"
import GameStart from "./components/pages/GameStart";
import GameOver from "./components/pages/GameOver";
import Play from "./components/pages/Play"
import Game from "./components/pages/Game"
import Leaderboard from "./components/pages/Leaderboard"
import Recording from "./components/pages/Recording"
import Matchmaking from "./components/pages/Matchmaking"
import PrivateRoutes from './components/util/PrivateRoutes'

import axios from "./api/axios"

function App() {

  const refreshToken = async (currAccessToken) => {
    try {
      const URL = process.env.REACT_APP_API_URL + "/auth/refresh"
      const user = sessionStorage.getItem("user")
      const response = await axios.get(URL,
        {
          params: {
            username: user,
          },
          headers: {
            "Content-Type": "application/json",
            "x-access-token": currAccessToken,
          },
          withCredentials: false
        }
      )
      // console.log(JSON.stringify(response))
      const accessToken = response?.data?.accessToken
      // console.log(response?.status)
      console.log("REFRESH TOKEN: " + accessToken)
      sessionStorage.setItem("accessToken", accessToken)

    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const currAccessToken = sessionStorage.getItem("accessToken")
      if (currAccessToken) {
        refreshToken(currAccessToken)
      }
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/Home" element={<Home />} exact />
          <Route path="/account" element={<Account />} />
          <Route path="/account/settings" element={<Settings />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/start" element={<GameStart />} />
          <Route path="/play" element={<Play />} />
          <Route path="/matchmaking" element={<Matchmaking />} />
          <Route path="/game/:game_mode/:difficulty/:color" element={<Game />} />
          <Route path="over" element={<GameOver />} />
          <Route path="/recordings" element={<Recording />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App