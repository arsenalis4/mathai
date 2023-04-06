import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import $ from 'jquery';
import { useLocation, useNavigate } from "react-router-dom";
import { Camera } from "../CameraView/Camera";

export function ChoiceBody(){
    const loc = useLocation();
    const state = loc.state;

    const navigate = useNavigate();
    const [value, setValue] = useState(null);
    const [answer, setAnswer] = useState(null);
    const onChange = useCallback(e => {
        setValue(e.target.value);
    });

    const mathText = (str, txtValue) => {
        let txtArea = document.getElementById('choiceQuestionInputBox');                      
        let selectPos = txtArea.selectionStart;           
        let beforeTxt = txtValue.substring(0, selectPos);      
        let afterTxt = txtValue.substring(txtArea.selectionEnd, txtValue.length); 
        let addString = str
        setValue(beforeTxt + addString + afterTxt);   
        selectPos = selectPos + addString.length;
        txtArea.selectionStart = selectPos;
        txtArea.selectionEnd = selectPos;
    }

    useEffect(()=>{
        if(state === null){
            //Do Something...
        } else{
            setValue(state.canvasQuestion);
        }
    }, []);

    return (
        <div className="choiceBody">
            <div className="choiceQuestion">
                <div className="choiceQuestionHeaderFlex">
                    <Camera/>
                    <div className="choiceQuestionText">문제</div>
                    <div className="writeImage" style={{"margin-right": "5%"}} onClick={()=>{navigate("/write");}}><img src="img/signature.png" /></div>
                </div>
                <div className="choiceQuestionBox">
                    <textarea type="text-area" id="choiceQuestionInputBox" value={value} onChange={onChange}/>
                </div>
                <div className="mathEdit">
                    <div className="mathEditText">
                        <div className="choiceQuestionText" onClick={()=>{
                            $(".mathBox").css('display', 'flex');
                        }}>수식</div>
                        <div className="choiceQuestionText" style={{"visibility": "hidden"}}>수식</div>
                        <div className="choiceQuestionQuit" onClick={()=>{
                            $(".mathBox").css('display', 'none');
                        }}>
                            <img src="img/Vector (8).svg" />
                        </div>
                    </div>
                    <div className="mathBox">
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("()/()");
                            } else{
                                mathText("()/()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/분수.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("()^()");
                            } else{
                                mathText("()^()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/지수.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("sqrt()");
                            } else{
                                mathText("sqrt()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/루트.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("d()/d()");
                            } else{
                                mathText("d()/d()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/미분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("d^2()/d^2()");
                            } else{
                                mathText("d^2()/d^2()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/이계도미분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("∫()d()");
                            } else{
                                mathText("∫()d()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/부정적분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("∫()d()|[(),()]");
                            } else{
                                mathText("∫()d()|[(),()]", value);
                            }
                        }}><img className="mathIcon" src="img/수식/정적분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("Σ()_()=()~()");
                            } else{
                                mathText("Σ()_()=()~()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/시그마.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("lim(()->())()");
                            } else{
                                mathText("lim(()->())()", value);
                            }
                        }}><img className="mathIcon" src="img/수식/극한.svg"/></div>
                    </div>
                </div>
                <div className="isChoice" onClick={()=>{
                    if(value === null){
                        setValue("\n1.\n2.\n3.\n4.\n5.\n");
                    } else{
                        setValue(value+"\n1.\n2.\n3.\n4.\n5.\n");
                    }
                }}>
                    객관식입니까?
                </div>
                <div className="askBox">
                    <input type="submit" id="askSubmitBox" value="Ask" onClick={()=>{
                        $(".activityIndicator").css("display", "flex");
                        let txtArea = document.getElementById('choiceQuestionInputBox');
                        let txtText = txtArea.value;
                        axios.post("http://localhost:3000/answer", {
                            question: `-Clearly state the problem with all necessary details, including the domain and any constraints.\n-Use standard mathematical notation and symbols as much as possible.\n-Break down the problem into smaller steps and explain each step in detail.\n-Check and verify the answer using different methods, if possible.\n-Use specific keywords to clarify the type of problem, such as "definite integral," "derivative," "trigonometric functions," etc.\n-If possible, provide a context or real-world scenario to help clarify the problem and its relevance.\n-Avoid using ambiguous or unclear language, especially when defining variables or functions.\n-Explain it in Korean\n\nGiven Problem: ${txtText}`
                        }).then((res)=>{
                            navigate("/ans", {state:{
                                question: txtText,
                                answer: res.data.data
                            }});
                        });
                    }}/>
                </div>
                <div className="activityIndicator" style={{"display": "none"}}>
                    <img src="img/loading-gif.gif" />
                </div>
            </div>
        </div>
      );
}