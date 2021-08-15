import "../styles/auth.scss";
import illustrationImg from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import GoogleIconImg from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from '../hooks/Auth';

export const Home = () => {
  const {user, signInWithGoogle} = useAuth();

  const history = useHistory();

  async function handleCreateRoom(){
    if(!user){
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

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
        <div className='main-content'>
          <img src={LogoImg} alt="Let me ask" />
          <button onClick = {handleCreateRoom} className='create-room'>
            <img src={GoogleIconImg} alt="Logo da Google" />
            Crie sua sala com a Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type = 'submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
