import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ImportExportController } from './controllers/importexport.controller';
import { ImportExportService } from './services/importexport.service';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';

@Module({
  imports: [AuthModule],
  controllers: [ImportExportController],
  providers: [ImportExportService],
})
export class ImportExportModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ImportExportController);
  }
}
