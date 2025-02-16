import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*", // Atau ['http://localhost:5173']
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization,ngrok-skip-browser-warning",
    optionsSuccessStatus: 200,
  });  

  await app.listen(3001);
}
bootstrap();
