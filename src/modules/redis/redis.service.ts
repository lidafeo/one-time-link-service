import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  async getAndDel(key: string): Promise<string | null> {
    const [getResult, delResult] = await this.multi()
      .get(key)
      .del(key)
      .exec();

    if (getResult[0]) {
      throw getResult[0];
    }
    if (delResult[0]) {
      throw delResult[0];
    }

    return getResult[1] ? getResult[1] as string : null;
  }

  onModuleDestroy(): void {
    this.disconnect();
  }
}