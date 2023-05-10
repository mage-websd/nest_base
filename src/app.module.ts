import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config, { redisOption } from './config';
import { dbConfig } from './config/datasource';
import { CommandModule } from './modules/only-cmd/command/command.module';
import { AppBaseModule } from 'src/modules/appbase/appbase.module';

// import and provider run all commands and run server
let importModules = [
  TypeOrmModule.forRoot(dbConfig),
] as any[];

if (config.RUN_ONLY_CMD) {
  // run command line
  importModules = importModules.concat([CommandModule, ]);
} else {
  // run web
  importModules = importModules.concat([
    AppBaseModule,
  ]);
}

@Module({
  imports: importModules,
  controllers: [],
  providers: [],
})
export class AppModule {}
