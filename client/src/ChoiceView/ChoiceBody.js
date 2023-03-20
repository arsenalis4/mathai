import axios from "axios";
import { useCallback, useState } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

export function ChoiceBody(){
    const navigate = useNavigate();
    const [value, setValue] = useState(null);
    const [answer, setAnswer] = useState(null);
    const onChange = useCallback(e => {
        setValue(e.target.value);
    });

    return (
        <div className="choiceBody">
            <div className="choiceQuestion">
                <div>
                    문제
                </div>
                <div className="choiceQuestionBox">
                    <textarea type="text-area" id="choiceQuestionInputBox" value={value} onChange={onChange}/>
                </div>
                <div className="mathEdit">
                    <div className="mathEditText">
                        <div onClick={()=>{
                            $(".mathBox").css('display', 'flex');
                        }}>수식</div>
                        <div style={{"visibility": "hidden"}}>수식</div>
                        <div onClick={()=>{
                            $(".mathBox").css('display', 'none');
                        }}>x</div>
                    </div>
                    <div className="mathBox">
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("()/()");
                            } else{
                                setValue(value+"()/()");
                            }
                        }}><img className="mathIcon" src="img/수식/분수.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("()^()");
                            } else{
                                setValue(value+"()^()");
                            }
                        }}><img className="mathIcon" src="img/수식/지수.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("sqrt()");
                            } else{
                                setValue(value+"sqrt()");
                            }
                        }}><img className="mathIcon" src="img/수식/루트.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("d()/d()");
                            } else{
                                setValue(value+"d()/d()");
                            }
                        }}><img className="mathIcon" src="img/수식/미분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("d^2()/d^2()");
                            } else{
                                setValue(value+"d^2()/d^2()");
                            }
                        }}><img className="mathIcon" src="img/수식/이계도미분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("∫()d()");
                            } else{
                                setValue(value+"∫()d()");
                            }
                        }}><img className="mathIcon" src="img/수식/부정적분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("∫()d()|[(),()]");
                            } else{
                                setValue(value+"∫()d()|[(),()]");
                            }
                        }}><img className="mathIcon" src="img/수식/정적분.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("Σ()_()=()~()");
                            } else{
                                setValue(value+"Σ()_()=()~()");
                            }
                        }}><img className="mathIcon" src="img/수식/시그마.svg"/></div>
                        <div className="mathIconBox" onClick={()=>{
                            if(value === null){
                                setValue("lim(()->())()");
                            } else{
                                setValue(value+"lim(()->())()");
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
                        axios.post("http://54.180.21.244:3000/answer", {
                            question: value + "(풀이는 한국어로)"
                        }).then((res)=>{
                            navigate("/ans", {state:{
                                question: value,
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