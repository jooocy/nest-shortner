import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUrl(@Body('url') url: string, @Req() req: Request) {
    return this.appService.createUrl(url, req);
  }

  @Get()
  getAllUrl() {
    return this.appService.getAllUrl();
  }

  @Delete()
  deleteOneUrl(@Body('url') url: string) {
    this.appService.deleteOneUrl(url);
  }

  @Patch()
  upClickedUrl(@Body('url') url: string) {
    this.appService.upClickedUrl(url);
  }
}
