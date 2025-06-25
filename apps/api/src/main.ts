import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

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

  console.log(
    `🚀 API Server running on: http://localhost:${process.env.PORT ?? 8000}`,
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
