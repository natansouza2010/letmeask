import { ReactNode } from "react";

type QuestionProps = {
    children?: ReactNode;
    content: string;
    author: {
        name: string;
        avatar: string;
    }

}

export const Question = (props: QuestionProps) =>{
    return (
        <div className="question">
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src= {props.author.avatar} alt={props.author.name}/>
                    <span>{props.author.name}</span>
                </div>
                <div>{props.children}</div>
            </footer>
        </div>
    );
}