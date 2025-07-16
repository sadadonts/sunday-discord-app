const express = require('express');
const { InteractionType, InteractionResponseType } = require('discord-interactions');
const { verifyKeyMiddleware } = require('discord-interactions');

const app = express();
app.use(express.json());

const PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: { content: "Hihihi~ it's Sunday! 💖" },
    });
  }

  return res.status(400).send('Unhandled interaction');
});

app.get('/', (req, res) => {
  res.send('Sunday bot is running 🎀');
});

app.listen(3000, () => console.log('Listening on port 3000'));
