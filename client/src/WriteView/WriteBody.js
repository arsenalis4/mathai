import axios from 'axios';
import React, { useState, useRef } from 'react';

export function WriteBody() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [recognizedText, setRecognizedText] = useState('');

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
    console.log(blob);
    
    const YOUR_APP_ID = "haeundaestar_gmail_com_8872aa_4cb609";
    const YOUR_APP_KEY = "7ccc698a4fa601586ab714951cf50f4cd8378f14820ee9713321205787430e27";
    const formData = new FormData();
    formData.append("src", blob, "image.png");
    formData.append("data_options", JSON.stringify({
        "include_asciimath": true,
        "include_latex": true
    }));
    
    axios.post("https://api.mathpix.com/v3/text", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "app_id": YOUR_APP_ID,
            "app_key": YOUR_APP_KEY
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid black' }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
      />
      <div onClick={()=>{
        recognizeText();
      }}>
        텍스트 변환하기
      </div>
      <div>
        <h2>추출된 텍스트</h2>
        <textarea
          value={recognizedText}
          rows={10} 
          cols={50}
          readOnly
          style={{ resize: 'none' }}
        />
      </div>
    </div>
  );
}