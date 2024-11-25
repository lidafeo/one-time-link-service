import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OneTimeLinkService } from './one-time-link.service';

@Controller('one-time-link')
export class OneTimeLinkController {
  constructor(private readonly oneTimeLinkService: OneTimeLinkService) {}

  @Post()
  create(@Body('content') content?: string): string {
    if (!content) {
      throw new BadRequestException('Content is required.');
    }
    return this.oneTimeLinkService.generateOneTimeLink(content);
  }

  @Get(':key')
  get(@Param('key') key: string): string {
    return this.oneTimeLinkService.getContent(key);
  }
}
