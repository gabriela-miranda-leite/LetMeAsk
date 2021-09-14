import "../styles/question.scss";
import "../styles/room.scss";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { RoomCode } from "../components/RoomCode";
import { database } from "../services/firebase";
import { Question } from "./Question";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { Modals } from "../components/Modals";
import Modal from "react-modal";

Modal.setAppElement("#root");

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEndRoomModalOpen, setIsEndRoomModalOpen] = useState(false);


  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <Toaster position="top-center" reverseOrder={false} />
      <header>
        <div className="content">
          <a href="/">
            <img src={logoImg} alt="Letmeask" />
          </a>
          <div>
            <RoomCode code={roomId} />
            <Button closeRoom isOutlined onClick={() => setIsEndRoomModalOpen(true)}>
              Encerrar sala
            </Button>
            <Modals
                  isOpen={isEndRoomModalOpen}
                  onRequestClose={() => setIsEndRoomModalOpen(false)}
                  roomId={roomId}
                  title="Encerrar sala"
                  description = "Tem certeza que você deseja encerrar esta sala?"
                  textButton="encerrar"
                  type="End"
                />
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <img src={deleteImg} alt="Remover questão" />
                </button>
                <Modals
                  isOpen={isDeleteModalOpen}
                  onRequestClose={() => setIsDeleteModalOpen(false)}
                  questionId={question.id}
                  roomId={roomId}
                  title="Excluir pergunta"
                  description = "Tem certeza que você deseja excluir esta pergunta?"
                  textButton="excluir"
                  type="delete"
                />
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
