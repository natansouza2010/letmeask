import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';


import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import { useParams, useHistory} from 'react-router-dom';

//import { useAuth } from '../hooks/useAuth';


import '../styles/room.scss';
import '../styles/question.scss';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
    id: string;
}





export const AdminRoom = () => {
    //const { user } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);


    const handleDeleteQuestion = async (questionId: string) =>{
        if(window.confirm('Tem certeza que você deseja excluir esta pergunta')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    const handleEndRoom = async () =>{
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>

                    </div>

                </div>
            </header>
            <main >
                <div className="room-title">
                    <h1>Sala - {title}</h1>
                    {questions.length > 0 && <span> {questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}

                            >  
                                <button
                                type="button"
                                onClick={()=> handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Perguntar"/>
                                </button>

                            </Question>
                        )
                    })}
                </div>

            </main>



        </div>
    );
}