import "../styles/auth.scss";
import illustrationImg from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
// import { useAuth } from "../hooks/Auth";

export const NewRoom = () => {
  // const {user} = useAuth();
  return (
    <div id="page-auth">
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
          <img src={LogoImg} alt="Let me ask" />
          <h2>Crie uma nova sala</h2>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
            <p>
              Quer entrar em uma sala já existente?             
              <a href="/">Clique aqui</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};
