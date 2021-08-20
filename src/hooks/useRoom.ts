import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

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

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState("");
  const history = useHistory();

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

  return{ questions, title};
}
