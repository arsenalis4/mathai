import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

export function Write() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  function handleCanvasMouseDown(e) {
    setIsDrawing(true);
    setLastX(e.clientX - canvasRef.current.getBoundingClientRect().left);
    setLastY(e.clientY - canvasRef.current.getBoundingClientRect().top);
  }

  function handleCanvasMouseMove(e) {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const y = e.clientY - canvas.getBoundingClientRect().top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();

      setLastX(x);
      setLastY(y);
    }
  }

  function handleCanvasMouseUp() {
    setIsDrawing(false);
  }

  async function recognizeText(){
    const canvas = canvasRef.current;
    const blob = await new Promise(resolve => canvas.toBlob(resolve));

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    
    const YOUR_APP_ID = "haeundaestar_gmail_com_8872aa_4cb609";
    const YOUR_APP_KEY = "7ccc698a4fa601586ab714951cf50f4cd8378f14820ee9713321205787430e27";
    reader.onloadend = function () {
        const base64data = reader.result;
        const formData = {
            "src": base64data,
            "formats": ["text", "data"],
            "data_options": {
                "include_asciimath": true,
                "include_latex": true
            }
        };
    
        $(".activityIndicator").css("display", "flex");
        axios.post("https://api.mathpix.com/v3/text", formData, {
            headers: {
                "Content-Type": "application/json",
                "app_id": YOUR_APP_ID,
                "app_key": YOUR_APP_KEY
            }
        })
        .then(response => {
            var recognizedText = response.data.data[0].value;
            if(recognizedText === null){
              if(response.data.text === null){
                alert("문제를 인식하지 못했습니다!");
              } else{
                recognizedText = response.data.text;
              }
            }
            navigate("/choice", {state:{
                canvasQuestion: recognizedText
            }});
        })
        .catch(error => {
            console.error(error);
        });  
    };
  }

  return (
    <div className='canvasBody'>
      <canvas className='canvas'
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight * 0.8}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
      />
      <div className="translateFlex" onClick={()=>{
        recognizeText();
      }}>
        <div className='translateText'>텍스트 변환하기</div>
      </div>
      <div className="activityIndicator" style={{"display": "none"}}>
        <img src="img/loading-gif.gif" />
      </div>
    </div>
  );
}