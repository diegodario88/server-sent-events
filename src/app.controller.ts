import { Controller, Get, Logger, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() response: Response) {
    const index = readFileSync(join(cwd(), 'public/index.html')).toString();
    response.type('text/html').send(index);
  }
}
