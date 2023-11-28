import React from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const fetchData = () => {
  // Replace 'YOUR_TOKEN' with your actual long-lived access token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhOGNiMTNjZTJiN2Y0ZDFjYjk0MWM1YzFjYTRmN2YyMSIsImlhdCI6MTcwMDI1MDQxNywiZXhwIjoyMDE1NjEwNDE3fQ.xc0OTLmb-UVyHwM-ts1HP36neodPU5t4UzSy0i8OJsQ';
  const url = 'ws://homeassistant.local:8123/api/websocket';

  const client = new W3CWebSocket(url);

  client.onopen = () => {
    console.log('WebSocket Client Connected');
    const message = {
      type: 'auth',
      access_token: token,
    };
    client.send(JSON.stringify(message));
  };

  client.onmessage = (message) => {
    const data = JSON.parse(message.data);
    console.log('Received:', data);

    if (data.type === 'event' && data.event.event_type === 'state_changed') {
      const newState = data.event.data.new_state;
      if (newState.entity_id === 'binary_sensor.presence_sensor_fp2_1708_presence_sensor_1') {
        if (newState.state === 'on') {
          alert('Someone is detected!');
        } else {
          alert('No one is detected.');
        }
      }
    }
  };

  client.onclose = () => {
    console.log('WebSocket Client Closed');
  };
};

function App() {
  return (
    <div className="App-container">
      <h1>Stimulate fall</h1>
      {/* Call fetchData when the button is clicked */}
      <button onClick={fetchData}>fall</button>
    </div>
  );
}

export default App;
