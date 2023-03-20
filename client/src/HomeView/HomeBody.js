import { useNavigate } from "react-router-dom"

export function HomeBody(){
    const navigate = useNavigate();
    return(
        <div className="homeBody">
            <div className="homeBodyFirstItem">
                <div className="homeBodySlogan">인공지능 수학 풀이</div>
                <div className="homeBodyName">MathAI</div>
            </div>
            <div className="homeBodySecondItem">
                <div className="homeBodySelector" id="choiceSelector" onClick={()=>{
                    navigate("/choice");
                }}>
                    <div>Ask!</div>
                </div>
            </div>
        </div>
    )
}