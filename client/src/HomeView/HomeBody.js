import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export function HomeBody(){
    const navigate = useNavigate();
    useEffect(()=>{
        try{
          let deferredPrompt;
          window.addEventListener('beforeinstallprompt', (e) => {
              deferredPrompt = e;
          });

          const installApp = document.getElementById('installApp');
          installApp.addEventListener('click', async () => {
              if (deferredPrompt !== null) {
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  if (outcome === 'accepted') {
                      deferredPrompt = null;
                  }
              }
          });
      } catch (err){}
    }, []);

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
            <div id="installApp">
                <img src="img/Group 123.svg" alt="app install"/>
            </div>
        </div>
    )
}