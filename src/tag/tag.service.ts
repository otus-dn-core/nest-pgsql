import { Injectable } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,
    ) {}
    async findall(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }
}