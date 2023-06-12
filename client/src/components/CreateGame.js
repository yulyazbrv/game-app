import React, { useState } from "react";
import { Button, Flex, TextInput, Title } from "@mantine/core";

const CreateGame = ({ onFormSubmit }) => {
  const [name, setName] = useState("");

  return (
    <Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
      <Flex w={400} direction={"column"} gap={10}>
        <Title order={2}>Create new game</Title>
        <TextInput
          placeholder="Your name"
          label="Enter your name"
          withAsterisk
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={() => onFormSubmit(name)}>Create Game</Button>
      </Flex>
    </Flex>
  );
};

export default CreateGame;
