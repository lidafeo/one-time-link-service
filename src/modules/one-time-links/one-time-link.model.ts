export class OneTimeLink {
  readonly key: string;
  readonly content: string;
  private active: boolean;

  constructor({ key, active, content }: { key: string; active: boolean; content: string }) {
    this.key = key;
    this.active = active;
    this.content = content;
  }

  get isActive() {
    return this.active;
  }

  markInactive() {
    this.active = false;
  }
}
