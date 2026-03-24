import { Body, Controller, Get, Post } from '@nestjs/common';

import { ColorsService } from './colors.service';
import { CreateColorDto } from './dtos/create-color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }
}
