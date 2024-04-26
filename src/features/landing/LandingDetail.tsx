import { Text } from "@mantine/core";

const MotdleDetail = () => {
  return (
    <>
      <Text>
        Dans Motdle, l'objectif est de trouver un mot mystère de 5 lettres en
        seulement 6 tentatives.
      </Text>
      <Text>À chaque essai, tu proposes un mot de 5 lettres.</Text>
      <Text>
        Après chaque tentative, le jeu te donne des indices pour chaque lettre
        du mot mystère pour t'aider à deviner plus facilement.
      </Text>
    </>
  );
};

export default MotdleDetail;
