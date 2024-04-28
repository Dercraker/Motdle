"use client";

import useNotify from "@/hooks/useNotify";
import { validateMotdleRowAction } from "@/lib/server-actions/validateMotdleRow.action";
import { CharacterStateSchema } from "@/lib/zod/Motdle/CharacterState.schema";
import {
  GameStatusSchema,
  GameStatusType,
} from "@/lib/zod/Motdle/GameStatus.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { RowValidationType } from "@/lib/zod/Motdle/RowValidation.schema";
import { Space, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import Board from "./Board";
import KeyBoard from "./KeyBoard";

interface MotdleProps {
  wantedWord: string;
  endGame: (gameStatus: GameStatusType) => void;
}

const Motdle = ({ wantedWord, endGame }: MotdleProps) => {
  const [gameBoard, setGameBoard] = useState<LineType[]>([]);
  const [currentRowIdx, setCurrentRowIdx] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GameStatusSchema.Enum.playing,
  );

  const { ErrorNotify } = useNotify();

  const handleInitGame = () => {
    const createLine = () =>
      Array.from({ length: 5 }, () => ({
        character: "_",
        state: CharacterStateSchema.Enum.idle,
      }));

    const newGameBoard: LineType[] = Array.from({ length: 6 }, createLine);

    setGameBoard(newGameBoard);
    setCurrentRowIdx(0);
    setGameStatus(GameStatusSchema.Enum.playing);
  };

  useEffect(() => {
    handleInitGame();
  }, [wantedWord]);

  const AddCharacter = (key: string) => {
    const currentRow = gameBoard[currentRowIdx];

    let modified = false;
    const editRow = currentRow.map((cell, cellIndex) => {
      if (!modified && cell.character === "_") {
        cell.character = key;
        modified = true;
      }

      return cell;
    });

    const newGameBoard = gameBoard.map((row, rowIndex) =>
      rowIndex === currentRowIdx ? editRow : row,
    );

    setGameBoard([...newGameBoard]);
  };
  const RemoveCharacter = () => {
    const currentRow = gameBoard[currentRowIdx].reverse();

    let modified = false;
    const editRow = currentRow.map((cell, cellIndex) => {
      if (!modified && cell.character !== "_") {
        cell.character = "_";
        modified = true;
      }

      return cell;
    });

    const newGameBoard = gameBoard.map((row, rowIndex) =>
      rowIndex === currentRowIdx ? editRow.reverse() : row,
    );

    setGameBoard([...newGameBoard]);
  };

  const ValidateRow = async () => {
    const currentRow: LineType = gameBoard[currentRowIdx];

    const rowIsFull = currentRow.every((cell) => cell.character !== "_");

    if (!rowIsFull)
      return ErrorNotify({ message: "Veuillez remplir la ligne" });

    const { data: lineValidationResponse, serverError } =
      await validateMotdleRowAction({
        row: currentRow,
        slug: wantedWord,
      } as RowValidationType);

    if (serverError) return ErrorNotify({ message: serverError });

    if (!lineValidationResponse)
      return ErrorNotify({
        title: "Une erreur est survenue dans la validation de la ligne",
      });
    if (
      lineValidationResponse?.every(
        (cell) => cell?.state === CharacterStateSchema.enum.correct,
      )
    )
      setGameStatus(GameStatusSchema.Enum.win);

    if (
      currentRowIdx === 5 &&
      lineValidationResponse?.some(
        (cell) => cell?.state !== CharacterStateSchema.enum.correct,
      )
    )
      setGameStatus(GameStatusSchema.Enum.lose);

    const newGameBoard = gameBoard.map((row, rowIndex) =>
      rowIndex === currentRowIdx ? (lineValidationResponse as LineType) : row,
    );

    setGameBoard([...newGameBoard]);

    setCurrentRowIdx((current) => current + 1);
  };

  useEffect(() => {
    if (
      gameStatus === GameStatusSchema.Enum.win ||
      gameStatus === GameStatusSchema.Enum.lose
    )
      return endGame(gameStatus);
  }, [gameStatus]);

  const handleClickKey = (key: string) => {
    key = key.toUpperCase();

    if (key === "↵" || key === "ENTER") ValidateRow();

    if (key === "⌫" || key === "BACKSPACE") return RemoveCharacter();

    const asciiCode = key.charCodeAt(0);
    if (key.length > 1 || asciiCode < 65 || asciiCode > 90) return;

    AddCharacter(key);
  };

  return (
    <>
      <Stack>
        <Board gameBoard={gameBoard} />
        <Space h="xl" />
        <KeyBoard
          gameBoard={gameBoard}
          AddCharacter={handleClickKey}
          isEventListenerEnabled={gameStatus === GameStatusSchema.Enum.playing}
        />
      </Stack>
    </>
  );
};

export default Motdle;
