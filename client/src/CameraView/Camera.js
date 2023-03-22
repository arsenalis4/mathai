import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

export function Camera() {
  const navigate = useNavigate();

  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      const base64data = reader.result;
      const blob = dataURItoBlob(base64data);
      recognizeText(blob);
    };
  }

  function dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

  async function recognizeText(blob){
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
            let txtArea = document.getElementById('choiceQuestionInputBox');
            txtArea.value = recognizedText;
            $(".activityIndicator").css("display", "none");
        })
        .catch(error => {
            console.error(error);
        });  
    };
  }

  return (
    <div className="writeImage" style={{"margin-left": "5%"}}>
        <label for="file">
            <div><img src="img/camera.png" style={{"width": "100%"}}/></div>
        </label>
        <input type="file" name="file" id="file" accept="image/*" onChange={handleImageChange} ></input>
    </div>
  );
}