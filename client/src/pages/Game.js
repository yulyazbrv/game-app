import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Board from "../components/Board";
import { Flex, Title } from "@mantine/core";
let socket;

const Game = ({ name, gameId }) => {
  const SERVER_ENDPOINT = "https://game-app-server.vercel.app";
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState({});
  const [game, setGame] = useState({});
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const event = gameId ? "joinGame" : "createGame";
    socket = new io(SERVER_ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    socket.emit(event, { name, gameId });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [SERVER_ENDPOINT, gameId, name]);

  useEffect(() => {
    socket.on("notification", (data) => {
      const { message = "" } = data;
      notification.push(message);
      setNotification([...notification]);
    });
  }, [notification]);

  useEffect(() => {
    socket.on("playerCreated", (data) => {
      const { player } = data;
      setPlayer(player);
    });

    socket.on("gameUpdated", (data) => {
      const { game } = data;
      setGame(game);
    });

    socket.on("gameEnd", (data) => {
      const { winner } = data;
      setWinner(winner);
    });
  });

  const onSquareClick = (value) => {
    socket.emit("moveMade", {
      square: value,
      player,
      gameId: game.id,
    });
  };

  const getWinnerMessage = () => {
    return winner.player.id === player.id ? "You Win" : "You Loose";
  };

  const turnMessage =
    game.playerTurn === player.id ? "Your Move" : "Opponunt Turn";

  const winnerMessage = winner ? getWinnerMessage() : "Draw game";

  return (
    <Flex direction={"column"} gap={10} align={"center"} justify={"center"}>
      {player && (
        <Title order={2}>
          Welcome {player.name}! You are playing {player.symbol}
        </Title>
      )}
      {game.status === "playing" && <Title order={4}>{turnMessage}</Title>}
      {game && <Title order={3}>Game ID: {game.id}</Title>}

      {game.status === "gameOver" && <Title order={4}>{winnerMessage}</Title>}

      <Board
        player={player}
        game={game}
        onSquareClick={onSquareClick}
        winner={winner}
      />
      {notification.map((msg, index) => (
        <Title order={6} key={index}>
          {msg}
        </Title>
      ))}
    </Flex>
  );
};

export default Game;
