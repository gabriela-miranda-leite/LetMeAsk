import { ButtonHTMLAttributes } from "react";
import sendWhiteImg from "../assets/images/send-white.svg";
import closeRoomImg from "../assets/images/close-room.svg";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  acceptModal?: boolean;
  cancelModal?: boolean;
  sendQuestion?: boolean;
  closeRoom?: boolean;
};

export function Button({
  cancelModal = false,
  acceptModal = false,
  sendQuestion = false,
  closeRoom = false,
  isOutlined = false,
  ...props
}: ButtonProps) {
  return (
    <div>
      <button
        className={`button ${isOutlined ? "outlined" : ""} ${closeRoom ? "closeRoom" : ""} ${
          acceptModal ? "acceptModal" : ""
        } ${cancelModal ? "cancelModal" : ""} ${
          sendQuestion ? "sendQuestion" : ""
        }`}
        {...props}
      />
      {sendQuestion && (
        <button className="button-send"  {...props}>
          <img src={sendWhiteImg} alt="Enviar pergunta" />
        </button>
      )}
      {closeRoom && (
        <button className="button-close"  {...props}>
          <img src={closeRoomImg} alt="Encerrar sala" />
        </button>
      )}
    </div>
  );
}
