import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { interval, map, takeWhile } from 'rxjs';

const MAX_PROGRESS_INTERACTIONS = 100;
const MAX_INCREMENT = 15;

@Injectable()
export class AppService {
  processLongTask() {
    let progress = 1;
    let increment = 1;
    return interval(1000).pipe(
      map((_) => {
        increment = Math.floor(Math.random() * MAX_INCREMENT) + 1;
        progress = Math.min(progress + increment, MAX_PROGRESS_INTERACTIONS);
        return {
          data: { progress, description: this.getDescription(progress) },
          id: randomUUID(),
        };
      }),
      takeWhile((i) => i.data.progress < MAX_PROGRESS_INTERACTIONS, true),
    );
  }

  getDescription(progress: number): string {
    if (progress <= 25) {
      return 'Requesting authentication ...';
    } else if (progress <= 50) {
      return 'Progressing transaction ....';
    } else if (progress <= 75) {
      return 'Emitting result for third-party services ...';
    } else {
      return 'Summarizing data and collecting metrics ...';
    }
  }
}
