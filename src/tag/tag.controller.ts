import { Controller, Get } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}
    @Get()
    async findall(): Promise<TagEntity[]> {
        return await this.tagService.findall();
    }
}