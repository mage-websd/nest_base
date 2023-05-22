import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config, { redisOption } from './config';
import { dbConfig } from './config/datasource';
import { CommandModule } from './modules/only-cmd/command/command.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/api/user/user.module';

// import and provider run all commands and run server
let importModules: any[] = [
  TypeOrmModule.forRoot(dbConfig),
];

switch (config.RUN_ONLY_AREA) {
  case 'cmd':
    importModules = importModules.concat([CommandModule,]);
    break;
  case 'admin':
    importModules = importModules.concat([
      AdminModule,
    ]);
    break;
  case 'api':
    importModules = importModules.concat([
      UserModule,
    ]);
    break;
  default:
    break;
}

@Module({
  imports: importModules,
  controllers: [],
  providers: [],
})
export class AppModule { }
