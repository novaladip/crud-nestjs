import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { Contact } from './contact.entity';
import { User } from '../user/user.entity'
import { Request } from './interface/request.interface'

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>
    ) { }

    async findAll(request: Request): Promise<Contact[]> {
        return await this.contactRepository
            .find({
                where: { createdBy: request.user.id },
                relations: ['createdBy'],
                order: {
                    firstName: 'ASC'
                }
            })
    }

    async create(user: User, contact: Contact): Promise<Contact> {
        contact.createdBy = user;
        return await this.contactRepository.save(contact);
    }

    async update(contact: Contact): Promise<UpdateResult> {
        return await this.contactRepository.update(contact.id, contact);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.contactRepository.delete(id);
    }
}
