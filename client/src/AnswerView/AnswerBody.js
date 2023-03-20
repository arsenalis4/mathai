import { useLocation, useNavigate } from "react-router-dom"

export function AnswerBody(){
    const navigate = useNavigate();
    const loc = useLocation();
    const state = loc.state;

    return(
        <div className="choiceAnswer">
            <div className="questionRecall">
                <div>문제</div>
                <textarea className="questionRecallBox" value={state.question} />
            </div>
            <div>
                답변
            </div>
            <div className="choiceAnswerBox">
                {state.answer}
            </div>
            <div className="reQuestion" onClick={()=>{
                navigate("/choice");
            }}>
                다시 질문하기
            </div>
        </div>
    )
}