import React, { useState, useEffect, useRef } from 'react'
import SingleChat from './SingleChat';
import './ChatWindow.css'
import msgSendSfc from '../assets/send_sfx.mp3'
import msgRcvSfc from '../assets/msg_rcv_sfx.mp3'
import muteIcon from '../assets/icon_mute.svg'
import unMuteIcon from '../assets/icon_unmute.svg'

import { w3cwebsocket as W3CWebsocket } from 'websocket';

const client = new W3CWebsocket('ws://127.0.0.1:8000');

export default function ChatWindow() {

    const [chatText, setChatText] = useState("")

    // state for fetched messages
    const [dbChats, setDbChats] = useState([]);
    const scrollableDivRef = useRef(null);

    // sfx hooks
    const [isMute, setIsMute] = useState(false)



    const onSendBtnClicked = (value) => {
        if (value === "") {
            console.log("sending empty msg is not valid")
        } else {
            client.send(JSON.stringify({
                type: "message",
                msg: value,
                timeStamp: (Date.now())
            }));
            const inputField = document.getElementById("inputText");
            inputField.focus();
            clearText();
            isMute ? console.log("sfx is disabled") : playRcvSound();
        }
    }


    useEffect(() => {
        console.log('Component has mounted.');

        client.onopen = () => {
            console.log('websocket client connected');
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setDbChats((prevData) => [...prevData, dataFromServer]);
        }

        return () => {
            console.log('Component will unmount.');
        };
    }, []); // The empty dependency array [] means this effect runs once, like componentDidMount


    // Functions which are used
    const clearText = () => {
        setChatText("")
    }

    const playRcvSound = () => {
        const audio = new Audio(msgSendSfc);
        audio.play();
    };

    // When "Enter" is pressed in Input Field
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSendBtnClicked(chatText);
            console.log('Enter key pressed inside input field');
        }
    };

    // Hook & Function to scroll to the bottom of the div
    useEffect(() => {
        // Function to scroll to the bottom
        const scrollToBottom = () => {
          if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
          }
        };
    
        // Call scrollToBottom when dbChats changes and it's not empty
        if (dbChats.length > 0) {
          scrollToBottom();
        }
      }, [dbChats]);

    return (
        <>
            <div id='wholeContet'>
                <div id='displayChats' ref={scrollableDivRef} >
                    {dbChats.map((item, index) => (
                        <SingleChat key={index} msg={item.msg} sendTime={new Date(item.timeStamp * 1000).toLocaleTimeString()} />
                    ))}
                </div>
                <div id='sendMessage'>
                    <input
                        type='text'
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        id='inputText'
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={() => onSendBtnClicked(chatText)} id='btnSend'> SEND </button>
                </div>
                <img id='btnMute' src={isMute ? muteIcon : unMuteIcon} alt='mute/unmute icon' onClick={() => setIsMute(!isMute)}></img>
            </div>
        </>
    )
}
