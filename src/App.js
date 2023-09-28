
import './App.css';
import { useContext, useEffect } from 'react';
import { dsbridgeContext } from './DSBridgeProvider';

function App() {



const { register, logger } = useContext(dsbridgeContext);
useEffect(()=>{
  register('onInitCallBack', (data)=>{
    logger(data, 'FromFlutter');
  })
})

  return (
    <div className="App">
      <header className="App-header">
        <p>
          DSBridge Logger

        </p>
   <div id='myLogger' style={{display: 'flex', flexDirection: 'column'}}></div>
      </header>
    </div>
  );
}

export default App;
