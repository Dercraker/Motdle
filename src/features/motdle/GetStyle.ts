import {
  CharacterStateSchema,
  CharacterStateType,
} from "@/lib/zod/Motdle/CharacterState.schema";
import styles from "@/styles/Key.module.css";

const GetStyle = (state: CharacterStateType) => {
  switch (state) {
    case CharacterStateSchema.Enum.present:
      return styles.present;
    case CharacterStateSchema.Enum.absent:
      return styles.absent;
    case CharacterStateSchema.Enum.correct:
      return styles.correct;
    case CharacterStateSchema.Enum.idle:
      return styles.idle;
  }
};

export default GetStyle;
