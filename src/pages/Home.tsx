import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState, FormEvent } from 'react';

import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss';
 
import { Button } from '../components/Button';


export const Home = () => {

    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');


    const handleCreateRoom = async () => {
        if(user){
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    
    }

    const handleJoinRoom = async (event: FormEvent) => {
        event.preventDefault();
        if(roomCode.trim()=== ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists. ');
            return;
        }
 
        if(roomRef.val().endedAt){
            alert('Room already closed');
            return;
        }

        history.push(`/rooms/${roomCode}`)
        
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
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
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