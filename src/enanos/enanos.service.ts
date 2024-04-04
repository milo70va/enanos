import { Injectable, NotFoundException } from '@nestjs/common';
import { Enano } from './enanos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { CreateEnanoDto } from './createEnanoDto';

@Injectable()
export class EnanosService {

    constructor(
        @InjectRepository(Enano)
        private enanoRepository: Repository<Enano>
    ) {}

    async create(createEnanoDto: CreateEnanoDto): Promise<Enano> {
        try {
            const enano = this.enanoRepository.create(createEnanoDto);
            return await this.enanoRepository.save(enano);
        } catch(e) {
            console.log(e);
            throw new Error('Error creating enano');
        }
    }

    async findAll(): Promise<Enano[]> {
        return await this.enanoRepository.find();
    }

    async findOne(id: number): Promise<Enano> {
        const enano = await this.findOne(id);
        if (!enano) {
            throw new NotFoundException(`Enano with id ${id} not found`);
        }
        return enano;
    }

    async update(id: number, updateEnanoDto: CreateEnanoDto): Promise<Enano> {
        try {
            const enano = await this.findOne(id); // Llama al método findOne de tu servicio
            this.enanoRepository.merge(enano, updateEnanoDto);
            return await this.enanoRepository.save(enano);
        } catch(e) {
            console.log(e);
            throw new Error('Error updating enano');
        }
    }
    
    async remove(id: number): Promise<void> {
        await this.enanoRepository.delete(id);
    }
}
