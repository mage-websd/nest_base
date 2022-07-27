import {
  Injectable
} from '@nestjs/common';
import { AppQueue } from 'src/provides/queue/app.queue';
import { AppMailer } from 'src/provides/mailer/app.mailer';

@Injectable()
export class AppBaseService {
  async appbasetest() {
    const queueJob = new AppQueue('QueueJob', {
      attempts: 100,
    });
    await queueJob.add({id: 1, name: 'soda'});

    AppMailer('soda@soda.io', 'subject', {
      template: 'mail',
      templateData: {
        data: 'soda'
      },
      attachments: [{
        path: 'path/to/file'
      }],
      attachRenameFlag: true
    });

  }
}
