import React from "react";
import Square from "./Square";
import { Flex } from "@mantine/core";

const Board = ({ game, player, onSquareClick, winner }) => {
  const { playBoard = [], status = "waiting" } = game;
  const enabled = status === "playing";
  const canPlay = player.id === game.playerTurn;
  const { winningCombination = [] } = winner || {};

  return (
    <Flex w={"100%"} align={"center"} justify={"center"}>
      <Flex w={400} justify={"space-between"} wrap={"wrap"}>
        {playBoard.map((item, index) => {
          const isWinnerSquare = winningCombination.includes(index);
          return (
            <Square
              key={index}
              value={item}
              onClick={() => onSquareClick(index)}
              enabled={enabled}
              canPlay={canPlay}
              isWinnerSquare={isWinnerSquare}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Board;
