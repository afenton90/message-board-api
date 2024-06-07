import { messagesService } from '../../src/services/messages';

describe('messages service', () => {
  beforeAll(async () => {
    await messagesService.setup();
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

  it('should error if message is blank', async () => {
    await expect(messagesService.create({ text: '' })).rejects.toThrow(
      'Invalid message',
    );
  });
});
