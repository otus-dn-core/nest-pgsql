import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
    async createUser(createUserDto: CreateUserDto) {
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        console.log('newUser', newUser); 
        return createUserDto;
    }
}