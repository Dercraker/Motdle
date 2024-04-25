import { Board } from "@/components/Game/Board";
import { KeyBoard } from "@/components/Game/KeyBoard";
import { Space } from "@mantine/core";

const RoutePage = () => {
  return (
    <>
      <Board />
      <Space h="xl" />
      <KeyBoard />
    </>
  );
};

export default RoutePage;
