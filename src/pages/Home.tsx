import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import toast, { Toaster } from "react-hot-toast";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [admin, setAdmin] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Sala não existe", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    if (roomRef.val().endedAt) {
      toast.error("Sala encerrada", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    toast.success("Sala encontrada", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    admin
      ? history.push(`admin/rooms/${roomCode}`)
      : history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <Toaster position="top-center" reverseOrder={false} />
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <div>
          <strong>Toda resposta tem uma pergunta.</strong>
          <p>Aprenda e compartilhe conhecimento com outras pessoas.</p>
        </div>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <a href="/">
              <img src={googleIconImg} alt="Logo do Google" />
            </a>
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
            <Button
              isOutlined={true}
              onClick={() => setAdmin(true)}
              type="submit"
            >
              Entrar na sala como admnistrador
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
