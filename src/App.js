import './App.css';
// import { w3cwebsocket as W3CWebsocket } from 'websocket';
// import { useEffect } from 'react'
import ChatWindow from './components/ChatWindow';

// const client = new W3CWebsocket('ws://127.0.0.1:8000');

function App() {

  // useEffect(() => {
  //   console.log('Component has mounted.');

  //   client.onopen = () => {
  //     console.log('websocket client connected');
  //   }

  //   client.onmessage = (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     console.log("got reply: " + dataFromServer);
  //     for (let key in dataFromServer) {
  //       console.log(key, dataFromServer[key]);
  //     }
  //   }

  //   return () => {
  //     console.log('Component will unmount.');
  //   };
  // }, []); // The empty dependency array [] means this effect runs once, like componentDidMount

  // const onSendBtnClicked = (value) => {
  //   client.send(JSON.stringify({
  //     type: "message",
  //     msg: value
  //   }));
  // }

  return (
    <>
      <ChatWindow />
    </>
  );
}

export default App;
