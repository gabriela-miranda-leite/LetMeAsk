import "../styles/modals.scss";

import Modal from "react-modal";
import { database } from "../services/firebase";
import atencionImg from "../assets/images/atencion.svg";
import deleteImg from "../assets/images/delete-red.svg";
import { Button } from "./Button";
import { useHistory } from "react-router-dom";
type ModalDeleteProps = {
  type:string
  title: string;
  description: string;
  isOpen: boolean;
  roomId?: string;
  questionId?: string;
  textButton: string;
  onRequestClose: () => void;
};

export const Modals = ({
  isOpen,
  roomId,
  questionId,
  title,
  description,
  textButton,
  type,
  onRequestClose,
}: ModalDeleteProps) => {

  const history = useHistory();

  async function handleDeleteQuestion() {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    onRequestClose();
  }

  async function handleEndRoom() {
    console.log("end")
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  return (
    <Modal
      overlayClassName="overlay"
      className="modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="content">
        <img src={type === 'delete' ? deleteImg : atencionImg} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <Button cancelModal onClick={onRequestClose}>
            Cancelar
          </Button>
          <Button acceptModal type="button" onClick={type === 'delete' ? handleDeleteQuestion : handleEndRoom}>
            Sim, {textButton}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
