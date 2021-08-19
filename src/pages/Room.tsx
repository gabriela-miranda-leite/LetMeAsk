import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useParams } from "react-router-dom";
import "../styles/room.scss";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { FormEvent } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";

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

export const Room = () => {
  const params = useParams<RoomParams>();
  const roomID = params.id;
  const [newQuestion, setNewQuestion] = useState("");
  const [load, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const { signInWithGoogle, user } = useAuth();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomID}`);
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      setTitle(databaseRoom.title);
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
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
      setQuestions(parsedQuestions);
    });
  }, [roomID]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };
    setLoad(true);
    await database.ref(`rooms/${roomID}/questions`).push(question);
    toast.success("Pergunta enviada!", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setLoad(false);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomID} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length === 1 ? (
            <span>1 pergunta</span>
          ) : (
            <span>{questions.length} perguntas</span>
          )}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
            placeholder="O que você quer perguntar?"
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button onClick={signInWithGoogle}>faça seu login</button>.
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
};
