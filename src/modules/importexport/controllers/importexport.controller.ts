import { Controller, Post } from '@nestjs/common';
import { ImportExportService } from '../services/importexport.service';

@Controller('importexport')
export class ImportExportController {
  constructor(private readonly importexportService: ImportExportService) {}

  @Post('import')
  public async importCsv() {
    return this.importexportService.import();
  }

  @Post('export')
  public async exportCsv() {
    return this.importexportService.export();
  }
}
