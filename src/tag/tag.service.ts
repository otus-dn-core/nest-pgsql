import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {
    findall(): string[] {
        return ['teg1', 'teg2'];
    }
}