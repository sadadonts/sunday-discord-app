const express = require('express');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { verifyKeyMiddleware } = require('discord-interactions');

const app = express();
app.use(express.json());

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

// Verifies all incoming requests from Discord
app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req, res) => {
  const interaction = req.body;

  // Respond to Discord's PING for verification
  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  // Slash command handler
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const userMessage = interaction.data.options?.[0]?.value || '';

    let responseText = "Hihihi~ It's Sunday! 🌸";

    if (userMessage.toLowerCase().includes("date")) {
      responseText = "Sorry, hehe... I like older men 😳";
    }

    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: responseText,
      },
    });
  }

  return res.status(400).send('Unhandled interaction');
});

app.get('/', (req, res) => {
  res.send('Sunday bot is alive! 🌼');
});

app.listen(3000, () => {
  console.log('Bot is listening on port 3000');
});