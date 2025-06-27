import { useCallback, useEffect, useReducer, useState } from "react";
import { WORDS, type Challenge } from "../utils/words";
import { gameReducer, initialGameState } from "../reducer/gameReducer";

interface UseGameLogicResult {
  currentLetterInput: string;
  setCurrentLetterInput: React.Dispatch<React.SetStateAction<string>>;
  lettersUsed: { value: string; correct: boolean }[];
  challenge: Challenge | null;
  score: number;
  attemptLimit: number;
  handleConfirm: () => void;
  handleRestartGame: () => void;
}

export function useGameLogic(): UseGameLogicResult {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { lettersUsed, challenge, score, attemptLimit } = state;
  const [currentLetterInput, setCurrentLetterInput] = useState("");

  const ATTEMPT_MARGIN = 5;

  const endGame = useCallback(
    (message: string) => {
      alert(message);

      const index = Math.floor(Math.random() * WORDS.length);
      const randomWORD = WORDS[index];
      const newAttemptLimit = randomWORD.word.length + ATTEMPT_MARGIN;
      dispatch({
        type: "START_GAME",
        payload: { challenge: randomWORD, attemptLimit: newAttemptLimit },
      });
      setCurrentLetterInput("");
    },
    [dispatch]
  );

  const startGame = useCallback(() => {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWORD = WORDS[index];
    const newAttemptLimit = randomWORD.word.length + ATTEMPT_MARGIN;

    dispatch({
      type: "START_GAME",
      payload: { challenge: randomWORD, attemptLimit: newAttemptLimit },
    });
    setCurrentLetterInput("");
  }, [dispatch, ATTEMPT_MARGIN]);

  const handleRestartGame = useCallback(() => {
    const isConfirmed = confirm(
      "Você tem certeza que deseja reiniciar o jogo?"
    );
    if (isConfirmed) {
      dispatch({ type: "RESET_GAME" });
      startGame();
    }
  }, [dispatch, startGame]);

  const handleConfirm = useCallback(() => {
    if (!challenge) return;
    if (!currentLetterInput.trim()) return alert("Digite uma letra!");

    const value = currentLetterInput.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      alert(`Você já utilizou a letra: ${value}`);
      setCurrentLetterInput("");
      return;
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;
    const correct = hits > 0;

    dispatch({
      type: "ADD_LETTER_USED",
      payload: { value, correct, hits },
    });
    setCurrentLetterInput("");
  }, [challenge, currentLetterInput, lettersUsed, dispatch]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (!challenge) return;

    if (score === challenge.word.length) {
      return endGame("Parabéns! 🎉 Você descobriu a palavra! 👏🏽");
    }

    if (lettersUsed.length === attemptLimit && lettersUsed.length > 0) {
      return endGame("Que pena, você usou todas as tentativas!");
    }
  }, [score, lettersUsed.length, challenge, attemptLimit, endGame]);

  return {
    currentLetterInput,
    setCurrentLetterInput,
    lettersUsed,
    challenge,
    score,
    attemptLimit,
    handleConfirm,
    handleRestartGame,
  };
}
