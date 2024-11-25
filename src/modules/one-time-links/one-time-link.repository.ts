import { Injectable } from '@nestjs/common';
import { OneTimeLink } from './one-time-link.model';

@Injectable()
export class OneTimeLinkRepository {
  private linksMap = new Map<string, OneTimeLink>();

  create(oneTimeLink: OneTimeLink) {
    this.linksMap.set(oneTimeLink.key, oneTimeLink);
    return oneTimeLink;
  }

  update(oneTimeLink: OneTimeLink) {
    this.linksMap.set(oneTimeLink.key, oneTimeLink);
    return oneTimeLink;
  }

  getByKey(linkKey: string) {
    return this.linksMap.get(linkKey);
  }
}
