import { useCallback, useEffect, useReducer, useState } from "react";
import { WORDS, type Challenge } from "../utils/words";
import { gameReducer, initialGameState } from "../reducer/gameReducer";

interface ModalState {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface UseGameLogicResult {
  currentLetterInput: string;
  setCurrentLetterInput: React.Dispatch<React.SetStateAction<string>>;
  lettersUsed: { value: string; correct: boolean }[];
  challenge: Challenge | null;
  score: number;
  attemptLimit: number;
  handleConfirm: () => void;
  handleRestartGame: () => void;
  modal: ModalState;
  closeModal: () => void;
}

export function useGameLogic(): UseGameLogicResult {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { lettersUsed, challenge, score, attemptLimit } = state;
  const [currentLetterInput, setCurrentLetterInput] = useState("");

  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    message: "",
  });

  const ATTEMPT_MARGIN = 5;

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, message: "" });
  }, []);

  const startGame = useCallback(() => {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWORD = WORDS[index];
    const newAttemptLimit = randomWORD.word.length + ATTEMPT_MARGIN;

    dispatch({
      type: "START_GAME",
      payload: { challenge: randomWORD, attemptLimit: newAttemptLimit },
    });
    setCurrentLetterInput("");
    closeModal();
  }, [dispatch, ATTEMPT_MARGIN, closeModal]);

  const endGame = useCallback(
    (message: string) => {
      setModal({
        isOpen: true,
        message: message,
        onConfirm: startGame,
        confirmText: "Jogar Novamente",
        cancelText: "Fechar",
      });
    },
    [startGame]
  );

  const handleRestartGame = useCallback(() => {
    setModal({
      isOpen: true,
      message: "Você tem certeza que deseja reiniciar o jogo?",
      onConfirm: () => {
        dispatch({ type: "RESET_GAME" });
        startGame();
        closeModal();
      },
      confirmText: "Sim, reiniciar",
      cancelText: "Não",
    });
  }, [dispatch, startGame, closeModal]);

  const handleConfirm = useCallback(() => {
    if (!challenge) return;
    if (!currentLetterInput.trim()) {
      setModal({
        isOpen: true,
        message: "Digite uma letra!",
        onConfirm: closeModal,
        confirmText: "OK",
        cancelText: "OK",
      });
      setCurrentLetterInput("");
      return;
    }

    const value = currentLetterInput.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value
    );

    if (exists) {
      setModal({
        isOpen: true,
        message: `Você já utilizou a letra: ${value}`,
        onConfirm: closeModal,
        confirmText: "OK",
        cancelText: "OK",
      });
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
  }, [challenge, currentLetterInput, lettersUsed, dispatch, closeModal]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (!challenge) return;

    if (score === challenge.word.length) {
      return endGame("Você descobriu a palavra! 👏🏽 Parabéns! 🎉 ");
    }

    if (lettersUsed.length === attemptLimit && lettersUsed.length > 0) {
      return endGame("Você usou todas as tentativas! Que pena! ");
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
    modal,
    closeModal,
  };
}
