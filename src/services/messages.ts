import { randomUUID } from 'crypto';
import { RxCollection, createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

interface Message {
  id: string;
  text: string;
}

let database: { messages: RxCollection };

export const messagesService = {
  async setup(): Promise<void> {
    const db = await createRxDatabase({
      name: 'messages-db',
      storage: getRxStorageMemory(),
    });

    database = await db.addCollections({
      messages: {
        schema: {
          version: 0,
          type: 'object',
          primaryKey: 'id',
          properties: {
            id: {
              type: 'string',
            },
            text: {
              type: 'string',
            },
          },
        },
      },
    });
  },

  async create(messageOptions: { text: string }): Promise<Message> {
    if (!messageOptions.text) {
      throw new Error('Invalid message');
    }

    const id = randomUUID();
    const message: Message = {
      id,
      text: messageOptions.text,
    };

    console.log('Creating message:', message);

    await database.messages.insert(message);

    console.log('Successfully saved message:', message);

    return message;
  },
};
