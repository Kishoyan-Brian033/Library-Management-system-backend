import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';
import { Member } from './interfaces/member.interface';
import { ApiResponse } from 'src/shared/interfaces/api-response/api-response.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateMemberDto): ApiResponse<Member> {
    try {
      const member = this.membersService.create(data);
      return { success: true, message: 'Member created', data: member };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create member',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  @Get()
  findAll(@Query('active') active?: string): ApiResponse<Member[]> {
    try {
      const members =
        active === 'true'
          ? this.membersService.findActive()
          : this.membersService.findAll();
      return {
        success: true,
        message: `Found ${members.length} members`,
        data: members,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get members',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Member> {
    try {
      const member = this.membersService.findOne(id);
      return { success: true, message: 'Member found', data: member };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to get member',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateMemberDto,
  ): ApiResponse<Member> {
    try {
      const member = this.membersService.update(id, data);
      return { success: true, message: 'Member updated', data: member };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update member',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.membersService.remove(id);
      return { success: true, message: result.message };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to deactivate member',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }

  @Delete(':id/permanent')
  delete(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.membersService.delete(id);
      return { success: true, message: result.message };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete member',
        error: error instanceof Error ? error.message : ' Unknown error',
      };
    }
  }
}
