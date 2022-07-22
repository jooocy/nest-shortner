import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createUrl(@Body('url') url: string, @Req() req: Request) {
    return this.appService.createUrl(url, req);
  }

  @Delete()
  deleteOneUrl(@Body('url') url: string) {
    this.appService.deleteOneUrl(url);
  }
  @Patch()
  aupClickedUrl(@Body('url') url: string) {
    this.appService.upClickedUrl(url);
  }

  @Get('/:url')
  async redirectToUrl(@Req() req: Request, @Res() res: Response) {
    const redirectUrl = await this.appService.redirectToUrl(req);
    console.log(redirectUrl);
    return res.redirect(302, redirectUrl);
  }

  @Get()
  getAllUrl() {
    return this.appService.getAllUrl();
  }
}
