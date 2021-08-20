import { useEffect } from "react";
import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { BiLoaderCircle } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import "../styles/room.scss";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(false);
  const history = useHistory();

  const roomId = params.id;
  useEffect(() => {
    const handleCodeRoom = async () => {
      if (roomId.trim() === "") {
        return;
      }
      const roomCode = await database.ref(`rooms/${roomId}`).get();
      if (!roomCode.exists()) {
        history.push("/error");
        return;
      }
      const roomRef = database.ref(`rooms/${roomId}`);
      roomRef.on("value", (room) => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions =
          databaseRoom.questions ?? {};

        const parsedQuestions = Object.entries(firebaseQuestions).map(
          ([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isHighlighted: value.isHighlighted,
              isAnswered: value.isAnswered,
            };
          }
        );

        setTitle(databaseRoom.title);
        setQuestions(parsedQuestions);
      });
    };
    handleCodeRoom();
  }, [history, roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      toast.error("Você precisa estar logado", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    setLoad(true);
    await database.ref(`rooms/${roomId}/questions`).push(question);
    toast.success("Pergunta enviada!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setLoad(false);
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            {load ? (
              <Button disabled>
                <BiLoaderCircle />
              </Button>
            ) : (
              <>
                <Button type="submit">Enviar pergunta</Button>
                <Toaster position="top-center" reverseOrder={false} />
              </>
            )}
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}