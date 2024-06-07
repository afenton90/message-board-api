import { randomUUID } from 'crypto';
import { RxCollection, RxDocument, createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';

export interface Message {
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
              maxLength: 36,
            },
            text: {
              type: 'string',
            },
          },
        },
      },
    });
  },

  async teardown(): Promise<void> {
    console.log('Removing messages database');
    const allDocuments = await database.messages.find().exec();
    await Promise.all(allDocuments.map((doc) => doc.remove()));
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

  async getAll(): Promise<Message[]> {
    const messages = await database.messages.find().exec();

    // Map database messages to message type
    return messages.map((message: RxDocument) => ({
      id: message.get('id'),
      text: message.get('text'),
    }));
  },
};
