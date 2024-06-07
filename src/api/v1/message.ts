import express from 'express';

import { messagesService } from '../../services/messages';

const router = express.Router();

interface MessageAPIRequest {
  text: string;
}

interface MessageAPIResponse {
  id: string;
}

router.post<MessageAPIRequest, MessageAPIResponse>('/', async (req, res) => {
  const message = await messagesService.create({ text: req.body.text });

  res.json({
    id: message.id,
  });
});

router.get('/', async (req, res) => {
  const messages = await messagesService.getAll();

  res.json(messages);
});

export default router;
