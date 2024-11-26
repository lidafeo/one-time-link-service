import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OneTimeLinkModule } from './modules/one-time-links/one-time-link.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    RedisModule,
    OneTimeLinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
