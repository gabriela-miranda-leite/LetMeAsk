import Modal from "react-modal";
import { database } from "../services/firebase";
import closeImg from "../assets/images/close.svg";
import "../styles/modal-delete.scss";
import { Button } from "./Button";
type ModalDeleteProps = {
  isOpen: boolean;
  roomId: string;
  questionId: string;
  onRequestClose: () => void;
};

export const ModalDelete = ({
  isOpen,
  roomId,
  questionId,
  onRequestClose,
}: ModalDeleteProps) => {
  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    onRequestClose();
  }

  return (
    <Modal
      overlayClassName="overlay"
      className="modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="modal">
        <button className="close" onClick={onRequestClose}>
          <img src={closeImg} alt="Fechar modal" />
        </button>
        <h2>Tem certeza que você deseja excluir esta pergunta?</h2>
        <div className="buttons">
          <Button onClick={handleDeleteQuestion}>
            Deletar
          </Button>
          <Button  isOutlined={true} type="button" onClick={onRequestClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
