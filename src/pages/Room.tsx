import logoImg from '../assets/images/logo.svg';


import {Button} from '../components/Button'
import {RoomCode} from '../components/RoomCode';

import {useParams} from 'react-router-dom';
import {FormEvent ,useState, useEffect} from 'react';
import { useAuth } from '../hooks/useAuth';


import '../styles/room.scss';
import { database } from '../services/firebase';


type RoomParams = {
    id: string;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighligted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighligted: boolean;
}

export const Room = () =>{
    const {user} = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');

    useEffect(()=>{
        
        const roomRef = database.ref(`rooms/${params.id}`)
        roomRef.on('value', room=>{
            const databaseRoom = room.val();
            
            const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};
            

            const parsedQuestions= Object.entries(firebaseQuestion).map(([key,value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighligted: value.isHighligted,
                    isAnswered: value.isAnswered  
                }

            })
            console.log(parsedQuestions);
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })

    }, [params.id]);



    const handleSendQuestion = async(event: FormEvent) =>{
        event.preventDefault();
        if(newQuestion.trim() === ''){
            return;
        }
        if(!user){
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighligted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${params.id}/questions`).push(question);

        setNewQuestion('');

    }

    return (
        <div id= "page-room">
            <header>
                <div className = "content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code= {params.id}/>
                    
                </div>
            </header>
            <main >
                <div className="room-title">
                    <h1>Sala - {title}</h1>
                    {questions.length > 0 && <span> {questions.length} pergunta(s)</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                    placeholder="O que você quer perguntar? "
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}

                    />

                    <div className="form-footer">
                        {user ? (
                        <div className="user-info">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                        ):(
                            <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
                            )
                         }
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>

                </form>

                {JSON.stringify(questions)}
            </main>



        </div>
    );
}