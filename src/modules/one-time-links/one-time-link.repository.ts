import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class OneTimeLinkRepository {
  constructor(private readonly redisService: RedisService) {}

  async create(linkKey: string, content: string) {
    await this.redisService.set(linkKey, content);
    return this.redisService.get(linkKey);
  }

  getAndDelete(linkKey: string): Promise<string | null> {
    return this.redisService.getAndDel(linkKey);
  }

  getByKey(linkKey: string): Promise<string | null> {
    return this.redisService.get(linkKey);
  }
}
