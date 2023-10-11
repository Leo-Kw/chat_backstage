import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

const config = new DocumentBuilder()
  .setTitle('Leo chat docs')
  .setDescription('Leo chat API description')
  .setVersion('1.0')
  .build()

export const createSwagger = (app: INestApplication) => {
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)
}
