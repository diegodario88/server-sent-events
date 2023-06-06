import { Controller, Get, MessageEvent, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() response: Response) {
    const index = readFileSync(join(cwd(), 'public/index.html')).toString();
    response.type('text/html').send(index);
  }

  @Sse('api/v1/sse/progress')
  progress(): Observable<MessageEvent> {
    return this.appService.processLongTask();
  }
}
