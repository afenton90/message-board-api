import { messagesService } from '../../src/services/messages';

describe('messages service', () => {
  beforeAll(async () => {
    await messagesService.setup();
  });

  afterEach(async () => {
    await messagesService.teardown();
  });

  it('should create a new message', async () => {
    const message = await messagesService.create({
      text: 'a test message',
    });

    expect(message).toEqual({
      id: expect.any(String),
      text: 'a test message',
    });
  });

  it('should error on create if message is blank', async () => {
    await expect(messagesService.create({ text: '' })).rejects.toThrow(
      'Invalid message',
    );
  });

  it('should return a blank array of messages by default', async () => {
    const messages = await messagesService.getAll();

    expect(messages).toEqual([]);
  });

  it('should return a list of the added messages', async () => {
    await messagesService.create({ text: 'Hello, World!' });
    await messagesService.create({ text: 'Another one!!' });

    const messages = await messagesService.getAll();

    expect(messages).toContainEqual({
      id: expect.any(String),
      text: 'Hello, World!',
    });
    expect(messages).toContainEqual({
      id: expect.any(String),
      text: 'Another one!!',
    });
  });
});
