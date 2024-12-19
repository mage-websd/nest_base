import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ImportExportModule } from './importexport/importexport.module';
import { UserModule } from './user/user.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

export const modules = [
  HomeModule,
  UserModule,
  AuthModule,
  ImportExportModule,
  RabbitmqModule,
];
