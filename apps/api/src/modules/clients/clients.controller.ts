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
  Query,
} from '@nestjs/common';

import { IsPaginated } from '@shared/decorators/is-paginated.decorator';

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { FindManyClientsDto } from './dtos/find-many-clients.dto';
import { UpdateClientDto } from './dtos/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @IsPaginated()
  findAll(@Query() query: FindManyClientsDto) {
    return this.clientsService.findAll(query);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Put(':clientId')
  update(
    @Param('clientId', ParseUUIDPipe) clientId: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(clientId, updateClientDto);
  }

  @Delete(':clientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('clientId', ParseUUIDPipe) clientId: string) {
    return this.clientsService.delete(clientId);
  }
}
