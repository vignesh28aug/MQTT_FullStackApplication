const mqtt = require('mqtt');
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const broker = "mqtt://test.mosquitto.org";
const topic = "test.mosquitto.org";

const client = mqtt.connect(broker);

let lastReceivedMessage = null;

client.on('connect', () => {
    console.log(`Connected to broker: ${broker}`);
    client.subscribe(topic, (err) => {
        if (err) {
            console.error(`Error subscribing to topic: ${err.message}`);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

client.on('message', (topic, message) => {
    try {

        const receivedPayload = message.toString(); 
        console.log(`Received message on topic '${topic}': ${receivedPayload}`);

        lastReceivedMessage = receivedPayload;
    } catch (error) {
        console.error('Error parsing received message:', error);
    }
});

client.on('error', (err) => {
    console.error(`MQTT client error: ${err.message}`);
});

client.on('close', () => {
    console.log("MQTT client disconnected");
});


app.get("/last-message", (req, res) => {
    if (!lastReceivedMessage) {
        res.status(404).send("No messages received yet");
    } else {
        res.send(lastReceivedMessage);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
