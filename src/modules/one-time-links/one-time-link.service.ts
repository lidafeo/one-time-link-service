import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import generateLinkKey from '../../utils/generate-link-key';
import { OneTimeLinkRepository } from './one-time-link.repository';
import { CanNotGenerateUniqKey, LinkNotFoundOrNotActiveError } from './errors';
import { LINK_KEY_LENGTH } from './constants';

@Injectable()
export class OneTimeLinkService {
  constructor(
    private readonly oneTimeLinkRepository: OneTimeLinkRepository,
    private readonly configService: ConfigService,
    @Inject(LINK_KEY_LENGTH)
    private readonly linkKeyLength: number,
  ) {}

  private async generateUniqKey() {
    for (let attempts = 0; attempts < 100; attempts++) {
      const key = generateLinkKey(this.linkKeyLength);
      const existingLink = await this.oneTimeLinkRepository.getByKey(key);
      if (!existingLink) {
        return key;
      }
    }
    throw new CanNotGenerateUniqKey();
  }

  async getContent(linkKey: string) {
    const content = await this.oneTimeLinkRepository.getAndDelete(linkKey);
    if (!content) {
      throw new LinkNotFoundOrNotActiveError();
    }
    return content;
  }

  async generateOneTimeLink(content: string) {
    const key = await this.generateUniqKey();
    await this.oneTimeLinkRepository.create(key, content);
    const baseUrl = this.configService.get<string>('BASE_URL');
    return new URL(`${baseUrl}/${key}`).href;
  }
}
