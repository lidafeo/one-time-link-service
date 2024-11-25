import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import generateLinkKey from '../../utils/generate-link-key';
import { OneTimeLink } from './one-time-link.model';
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

  private generateUniqKey(): string {
    for (let attempts = 0; attempts < 100; attempts++) {
      const key = generateLinkKey(this.linkKeyLength);
      const existingLink = this.oneTimeLinkRepository.getByKey(key);
      if (!existingLink) {
        return key;
      }
    }
    throw new CanNotGenerateUniqKey();
  }

  getContent(linkKey: string): string {
    const oneTimeLink = this.oneTimeLinkRepository.getByKey(linkKey);
    if (!oneTimeLink || !oneTimeLink.isActive) {
      throw new LinkNotFoundOrNotActiveError();
    }
    oneTimeLink.markInactive();
    this.oneTimeLinkRepository.update(oneTimeLink);
    return oneTimeLink.content;
  }

  generateOneTimeLink(content: string): string {
    const key = this.generateUniqKey();
    const oneTimeLink = new OneTimeLink({ key, active: true, content });
    const result = this.oneTimeLinkRepository.create(oneTimeLink);
    const baseUrl = this.configService.get<string>('BASE_URL');
    return new URL(`${baseUrl}/${result.key}`).href;
  }
}
