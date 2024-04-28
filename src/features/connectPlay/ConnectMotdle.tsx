import useNotify from "@/hooks/useNotify";
import { ValidateConnectMotdleRowAction } from "@/lib/server-actions/connectPlay/ConnectRowValidation.action";
import { GetPartyOfTheDayAction } from "@/lib/server-actions/connectPlay/GetPartyOfTheDay.action";
import { endGameAction } from "@/lib/server-actions/connectPlay/endGame.action";
import { CharacterStateSchema } from "@/lib/zod/Motdle/CharacterState.schema";
import {
  GameStatusSchema,
  GameStatusType,
} from "@/lib/zod/Motdle/GameStatus.schema";
import { LineType } from "@/lib/zod/Motdle/Line.schema";
import { ConnectRowValidationType } from "@/lib/zod/connectPlay/ConnectRowValidation.schema";
import { Space, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Board from "../motdle/Board";
import KeyBoard from "../motdle/KeyBoard";
import ConnectEndModal from "./ConnectEndModal";

interface ConnectMotdleProps {
  wantedSlug: string;
  partyId: string;
}

const ConnectMotdle = ({ wantedSlug, partyId }: ConnectMotdleProps) => {
  const [gameBoard, setGameBoard] = useState<LineType[]>([]);
  const [currentRowIdx, setCurrentRowIdx] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GameStatusSchema.enum.playing,
  );
  const [endGameModal, { toggle: toggleEndGameModal }] = useDisclosure(false);

  const { ErrorNotify } = useNotify();

  const handleInitGame = async () => {
    const createLine = () =>
      Array.from({ length: 5 }, () => ({
        character: "_",
        state: CharacterStateSchema.Enum.idle,
      }));

    const newGameBoard: LineType[] = Array.from({ length: 6 }, createLine);

    const { data, serverError } = await GetPartyOfTheDayAction(null);

    if (serverError) return ErrorNotify({ message: serverError });

    data?.lines?.map((line, index) => {
      newGameBoard[index] = line.characters.map((char) => ({
        character: char.letter,
        state: char.state,
      }));
    });

    let firstRowEdit = -1;
    newGameBoard.forEach((row, index) => {
      if (firstRowEdit === -1 && row.every((cell) => cell.character === "_"))
        firstRowEdit = index;
    });
    setCurrentRowIdx(firstRowEdit === -1 ? 6 : firstRowEdit);

    setGameStatus(
      data?.score?.result ? data.score.result : GameStatusSchema.Enum.playing,
    );

    setGameBoard(newGameBoard);
  };

  useEffect(() => {
    (async () => await handleInitGame())();
  }, [wantedSlug]);

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
      await ValidateConnectMotdleRowAction({
        row: currentRow,
        slug: wantedSlug,
        party: partyId,
      } as ConnectRowValidationType);
    if (serverError) return ErrorNotify({ message: serverError });

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
    (async () => {
      if (
        gameStatus === GameStatusSchema.Enum.win ||
        gameStatus === GameStatusSchema.Enum.lose
      ) {
        await endGameAction(gameStatus);
        toggleEndGameModal();
      }
    })();
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
      <ConnectEndModal
        isOpened={endGameModal}
        gameStatus={gameStatus}
        closeModal={toggleEndGameModal}
      />
    </>
  );
};

export default ConnectMotdle;
