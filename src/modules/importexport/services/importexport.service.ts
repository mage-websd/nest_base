import { Injectable } from '@nestjs/common';
import { parse, stringify } from 'csv';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class ImportExportService {
  /**
   *
   * @param data [
   *  [
   *    val1,val2,val3
   *  ],
   * ]
   */
  public async export() {
    const data = [
      ['col1', 'col2'],
      ['val1', 'val2'],
      [null, 'val3'],
      [undefined, 'val4'],
      ['', 'val5'],
      ['va"l6', 'va\nl7'],
    ];

    stringify(
      data,
      {
        bom: true,
      },
      (_err: any, result: any) => {
        writeFileSync('storages/w1.csv', result);
      },
    );
  }

  public async import() {
    const content = readFileSync('storages/w1.csv');
    const records = parse(content, {
      bom: true,
      skip_empty_lines: true,
    });
    const results = [];

    await records.forEach(async (item: any) => {
      results.push(item);
    });

    return results;
  }
}
