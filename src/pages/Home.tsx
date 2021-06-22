import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useHooks';


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
 
import { Button } from '../components/Button';


export const Home = () => {

    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();

    const handleCreateRoom = async () => {
        if(!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    
    }


    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da suas audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <h2>{}</h2>
                    <img src={logoImg} alt="Logo - Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt = "Icon - Google" />
                        Crie a sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}