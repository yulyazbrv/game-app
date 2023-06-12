import { Button, Flex, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";

const JoinGame = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");

  return (
    <Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
      <Flex w={400} direction={"column"} gap={10}>
        <Title order={2}>Join existing game</Title>
        <TextInput
          placeholder="Your name"
          label="Enter your name"
          withAsterisk
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          placeholder="id"
          label="Enter game id"
          withAsterisk
          onChange={(e) => setGameId(e.target.value)}
        />
        <Button
          onClick={() => onFormSubmit(name, gameId)}
          className="btn btn-warning"
        >
          Join Game
        </Button>
      </Flex>
    </Flex>
  );
};

export default JoinGame;
