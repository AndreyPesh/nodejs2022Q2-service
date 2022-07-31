import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';
import { cwd } from 'process';
import { config } from 'dotenv';
import { dirname, join, resolve } from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

config({ path: resolve(cwd(), '.env') });

const PORT = process.env.PORT || 3000;
const rootDir = dirname(__dirname);
const PATH_TO_DOC = 'doc/api.yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const DESCRIPTOR_API = await readFile(join(rootDir, PATH_TO_DOC), 'utf-8');
  const document = parse(DESCRIPTOR_API);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT);
}
bootstrap();
