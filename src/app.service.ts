import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { fromString } from 'uuidv4';
import { Shortner } from './entity/shortner.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('SHORTNER_REPOSITORY')
    private readonly shortnerRepository: Repository<Shortner>,
  ) {}

  async createUrl(url: string, req: Request): Promise<Shortner> {
    const isExists = await this.findOne(url);
    if (isExists) {
      return isExists;
    }
    const myUrl = req.headers.host;
    const shortUrl = myUrl + '/' + fromString(url);
    const shortner = this.shortnerRepository.save({ url, shortUrl });
    return shortner;
  }

  async getAllUrl(): Promise<Shortner[]> {
    return await this.shortnerRepository.find();
  }

  async deleteOneUrl(url: string): Promise<void> {
    await this.shortnerRepository.delete({ url });
  }

  async findOne(url: string): Promise<Shortner> {
    return await this.shortnerRepository.findOneBy({ url });
  }

  async upClickedUrl(url: string) {
    const target = await this.findOne(url);
    if (!target) {
      return;
    }
    target.clicks += 1;
    await this.shortnerRepository.update(target.id, { clicks: target.clicks });
  }

  async redirectToUrl(req: Request): Promise<string> {
    const shortUrl = 'localhost:3000/' + req.params.url;
    const target = await this.shortnerRepository.findOneBy({ shortUrl });
    if (!target) {
      throw new HttpException('Not Found', 404);
    }
    target.clicks += 1;
    await this.shortnerRepository.update(target.id, { clicks: target.clicks });
    return target.url;
  }
}
