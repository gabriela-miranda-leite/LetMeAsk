import "../styles/errors.scss";
import pillRedImg from "../assets/images/pill-red.svg";
import pillBlueImg from "../assets/images/pill-blue.svg";
import logoImg from "../assets/images/logo.svg";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const Errors = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      toast(
        (t) => (
          <span>
            Venha para a{" "}
            <button onClick={() => history.push("/")}> Home</button>
          </span>
        ),
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }, 1500);
  }, [history]);

  return (
    <div id="errors">
      <Toaster position="top-center" reverseOrder={false} />
      <header>
        <div className="logo">
          <a href="/">
            <img src={logoImg} alt="Letmeask" />
          </a>
        </div>
      </header>
      <main>
        <div className="content">
          <h1>Erro 404</h1>
          <div className="separator" />
          <h3>Como Neo, você escolheu a pílula vermelha</h3>
          <div className="pills">
            <img src={pillRedImg} alt="pílula-vermelha" />
            <img src={pillBlueImg} alt="pílula-azul" />
          </div>
        </div>
      </main>
    </div>
  );
};
