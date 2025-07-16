const express = require('express');
const { verifyKeyMiddleware } = require('discord-interactions');
const { InteractionResponseType, InteractionType } = require('discord-interactions');

const app = express();
app.use(express.json());

// Replace with your actual public key from the Discord Developer Portal
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

// Middleware to verify Discord requests
app.post('/interactions', verifyKeyMiddleware(DISCORD_PUBLIC_KEY), (req, res) => {
  const interaction = req.body;

  // Discord checks if your server is alive
  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  // Handle /talk command
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const userMessage = interaction.data.options?.[0]?.value || '';

    let responseText = "Hihihi~ it's so nice to hear from you 💗";

    if (userMessage.toLowerCase().includes("date")) {
      responseText = "Sorry hehe... I like older men~ 😳";
    } else if (userMessage.toLowerCase().includes("sad")) {
      responseText = "Aww don’t be sad 🥺 Come here, let me hug you 🤗";
    }

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: responseText,
      },
    });
  }
});

app.listen(3000, () => {
  console.log('Sunday is listening on port 3000');
});