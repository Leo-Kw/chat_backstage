import { Test, TestingModule } from '@nestjs/testing'
import { ChatController } from './user.controller'
import { ChatService } from './user.service'

describe('chatController', () => {
  let chatController: ChatController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatService],
    }).compile()

    chatController = app.get<ChatController>(ChatController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(chatController.getHello()).toBe('Hello World!')
    })
  })
})
