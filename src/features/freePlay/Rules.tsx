import { Button, Container, Paper } from "@mantine/core";

interface RulesProps {
  StartGame: () => void;
  gameIsReady?: boolean;
}
const Rules = ({ StartGame, gameIsReady }: RulesProps) => {
  return (
    <Container>
      <Paper>
        <Button onClick={StartGame} loading={gameIsReady}>
          Commencer à jouer !
        </Button>
      </Paper>
    </Container>
  );
};

export default Rules;
