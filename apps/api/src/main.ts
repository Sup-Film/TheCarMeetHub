import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  // Enable CORS - สำคัญสำหรับ Frontend ที่รันบน domain/port ที่ต่างกัน
  const origins =
    process.env.NODE_ENV === 'production'
      ? ['https://your-production-domain.com']
      : ['http://localhost:3000', 'http://localhost:3001']; // Next.js dev server ports

  app.enableCors({
    origin: origins, // Next.js dev server ports
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate')
    .setDescription('NestJS Boilerplate API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(
    `🚀 API Server running on: http://localhost:${process.env.PORT ?? 8000}`,
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
