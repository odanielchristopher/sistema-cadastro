import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ColorsService } from './colors.service';
import { CreateColorDto } from './dtos/create-color.dto';
import { UpdateColorDto } from './dtos/update-color.dto';

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

  @Put(':colorId')
  update(
    @Param('colorId', ParseUUIDPipe) colorId: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.colorsService.update(colorId, updateColorDto);
  }

  @Delete(':colorId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('colorId', ParseUUIDPipe) colorId: string) {
    return this.colorsService.delete(colorId);
  }
}
