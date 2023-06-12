import React, { useState } from "react";
import "./App.css";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Game from "./pages/Game";
import { AppShell, Header, MantineProvider } from "@mantine/core";
import { HeaderContent } from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

const App = () => {
  const [showGame, setShowGame] = useState(false);
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");

  const onFormSubmit = (name, gameId = "") => {
    setName(name);
    setGameId(gameId);
    setShowGame(true);
  };

  return (
    <div >
      {!showGame && (
        <MantineProvider>
          <AppShell
            header={<Header>{<HeaderContent />}</Header>}
            styles={(theme) => ({
              main: { backgroundColor: "#f7f7f8" },
            })}
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/create"
                element={<CreateGame onFormSubmit={onFormSubmit} />}
              ></Route>
              <Route
                path="/join"
                element={<JoinGame onFormSubmit={onFormSubmit} />}
              ></Route>
            </Routes>
          </AppShell>
        </MantineProvider>
      )}

      {showGame && <Game name={name} gameId={gameId} />}
    </div>
  );
};

export default App;
