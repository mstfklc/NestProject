import { Module } from '@nestjs/common';
import { LogicModule } from './logic/logic.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { GlobalJwtModule } from './custom/jwt/globalJwt.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    LogicModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    GlobalJwtModule,
    ScheduleModule.forRoot(),
  ],
  providers: [ConfigService],
})
export class AppModule {}
