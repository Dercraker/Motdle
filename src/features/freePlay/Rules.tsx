import {
  Button,
  Center,
  Container,
  Group,
  List,
  Stack,
  Text,
} from "@mantine/core";

interface RulesProps {
  StartGame: () => void;
  gameIsReady?: boolean;
}
const Rules = ({ StartGame, gameIsReady }: RulesProps) => {
  return (
    <Container>
      <Center>
        <Stack>
          <List>
            <List.Item>
              <Text>Le but du jeu est de deviner le mot caché.</Text>
            </List.Item>
            <List.Item>
              <Text>Vous avez 6 tentatives pour trouver le mot.</Text>
            </List.Item>
            <List.Item>
              <Text>Le mot est composé de 5 caractères et est français.</Text>
            </List.Item>
            <List.Item>
              <Group>
                <Text>Le mot n'est pas un mot composé</Text>
                <Text fs="italic" c="dimmed">
                  ex: monte-charge
                </Text>
              </Group>
            </List.Item>
            <List.Item>
              <Text>
                Le mot peut avoir des accents, des cédilles, des trémas...
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                Le mot peut être, un mot courant de tout les jours, comme un mot
                rare.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                Bon courage et bonne chance pour trouver le mot caché !
              </Text>
            </List.Item>
          </List>
          <Button onClick={StartGame} loading={gameIsReady}>
            Commencer à jouer !
          </Button>
        </Stack>
      </Center>
    </Container>
  );
};

export default Rules;
