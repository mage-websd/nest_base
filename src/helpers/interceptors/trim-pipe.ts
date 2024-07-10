import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

// use each action controller @UsePipes(new TrimPipe()) or in main.ts
@Injectable()
export class TrimPipe implements PipeTransform {
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values: any) {
    Object.keys(values).forEach((key) => {
      if (this.isObj(values[key])) {
        values[key] = this.trim(values[key]);
      } else {
        if (typeof values[key] === 'string') {
          values[key] = values[key].trim();
        }
      }
    });

    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (this.isObj(values) && ['body', 'query'].includes(type)) {
      return this.trim(values);
    }

    return values;
  }
}
