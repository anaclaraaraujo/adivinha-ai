import { Button } from "../Button"
import styles from "./styles.module.css"

interface ModalProps {
  message: string
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
}

export function Modal({ message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {onConfirm && (
            <Button title={confirmText} onClick={onConfirm} />
          )}
          <Button title={cancelText} onClick={onClose} />
        </div>
      </div>
    </div>
  );
}