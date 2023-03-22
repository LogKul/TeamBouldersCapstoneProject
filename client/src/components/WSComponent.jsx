import React, { useState, useEffect, useRef } from 'react';
import useWebSocketLite from '../api/webSocketHook.js'

// prettify
const sendTag = (message) => <span>&#11014;: {message}</span>;
const receiveTag = (message) => <span>&#11015;: {message}</span>;

function WSComponent() {
    const [messagesList, setMessagesList] = useState([
        <span key='1'>Messages will be displayed here</span>
    ]);
    const txtRef = useRef();

    // use our hook
    const ws = useWebSocketLite({
        socketUrl: 'ws://localhost:3000'
    });

    // receive messages
    useEffect(() => {
        if (ws.data) {
            const { message } = ws.data;
            setMessagesList((messagesList) =>
                [].concat(receiveTag(message), messagesList)
            );
        }
    }, [ws.data]);

    // send messages
    const sendData = () => {
        const message = txtRef.current.value || '';
        if (message) {
            setMessagesList((messagesList) =>
                [].concat(sendTag(message), messagesList)
            );
            ws.send(message);
        }
    };

    // a simple form
    return (
        <div>
            <div>Connection State: {ws.readyState ? 'Open' : 'Closed'}</div>

            <div>
                <form>
                    <label>Message (string or json)</label>
                    <textarea name='message' rows={4} ref={txtRef} />
                    <input type='button' onClick={sendData} value='Send' />
                </form>
            </div>

            <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
                {messagesList.map((Tag, i) => (
                    <div key={i}>{Tag}</div>
                ))}
            </div>

        </div>
    );
}

export default WSComponent;