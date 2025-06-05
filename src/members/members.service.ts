import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { CreateMemberDto } from './dtos/create-member.dto';
import { UpdateMemberDto } from './dtos/update-member.dto';

@Injectable()
export class MembersService {
  private members: Member[] = [];
  private nextId = 1;

  create(data: CreateMemberDto): Member {
    const exists = this.members.find((m) => m.email === data.email);
    if (exists) {
      throw new ConflictException('Email already in use');
    }

    const newMember: Member = {
      id: this.nextId++,
      ...data,
      isActive: true,
      createdAt: new Date(),
    };

    this.members.push(newMember);
    return newMember;
  }

  findAll(): Member[] {
    return this.members;
  }

  findActive(): Member[] {
    return this.members.filter((m) => m.isActive);
  }

  findOne(id: number): Member {
    const member = this.members.find((m) => m.id === id);
    if (!member) throw new NotFoundException(`Member ${id} not found`);
    return member;
  }

  update(id: number, data: UpdateMemberDto): Member {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException(`Member ${id} not found`);

    this.members[index] = { ...this.members[index], ...data };
    return this.members[index];
  }

  remove(id: number): { message: string } {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException(`Member ${id} not found`);

    this.members[index].isActive = false;
    return { message: `Member ${id} has been deactivated.` };
  }

  delete(id: number): { message: string } {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException(`Member ${id} not found`);

    const deleted = this.members.splice(index, 1)[0];
    return { message: `Member ${deleted.name} permanently deleted.` };
  }
}
