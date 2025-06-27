import { type Challenge } from "../utils/words";
import { type LettersUsedProps } from "../components/LettersUsed";

export interface GameState {
  score: number;
  lettersUsed: LettersUsedProps[];
  challenge: Challenge | null;
  attemptLimit: number;
}

export type GameAction =
  | {
      type: "START_GAME";
      payload: { challenge: Challenge; attemptLimit: number };
    }
  | {
      type: "ADD_LETTER_USED";
      payload: { value: string; correct: boolean; hits: number };
    }
  | { type: "RESET_GAME" };

export const initialGameState: GameState = {
  score: 0,
  lettersUsed: [],
  challenge: null,
  attemptLimit: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialGameState,
        challenge: action.payload.challenge,
        attemptLimit: action.payload.attemptLimit,
      };
    case "ADD_LETTER_USED":
      return {
        ...state,
        lettersUsed: [
          ...state.lettersUsed,
          { value: action.payload.value, correct: action.payload.correct },
        ],
        score: state.score + action.payload.hits,
      };
    case "RESET_GAME":
      return initialGameState;
    default:
      return state;
  }
}
