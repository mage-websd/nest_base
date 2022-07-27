import * as Bull from 'bull'
import config from '../../config';

export class AppQueue {
  private queueJob;
  private options;

  constructor(name, options?) {
    const optionsDefault = {
      attempts: 5,
      backoff: 5000,
      removeOnComplete: true
    }
    this.options = Object.assign(optionsDefault, options);
    this.queueJob = new Bull(name, { redis: {
        port: config.REDIS_PORT,
        host: config.REDIS_HOST,
        password: config.REDIS_PASSWORD,
        db: config.QUEUE_REDIS_DB,
      }, prefix: config.QUEUE_REDIS_PREFIX
    });
  }

  process() {
    return this.queueJob.process(function(job, done) {
      try {
        console.log(job.data);
        done();
      } catch (err) {
        done(err);
      }
    });
  }

  /**
   * 
   * @param payload json object store redis
   * @returns 
   */
  add(payload) {
    return this.queueJob.add(payload, {
      attempts: this.options.attempts,
      backoff: this.options.backoff,
      removeOnComplete: true
    });
  }
}
