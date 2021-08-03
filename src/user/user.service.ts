import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@app/config";
import { UserResponseInterface} from './types/userResponse.interface'
import { HttpException } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            email: createUserDto.email,
        });
        const userByUsername = await this.userRepository.findOne({
            username: createUserDto.username,
        });
        if (userByEmail || userByUsername) {
            throw new HttpException('Email or usrname are taken', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(
          {
            email: loginUserDto.email,
          },
          { select: ['id', 'username', 'email', 'forself', 'image', 'password'] },
        );
    
        if (!user) {
          throw new HttpException(
            'Credentials are not valid',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
    
        const isPasswordCorrect = await compare(
          loginUserDto.password,
          user.password,
        );
    
        if (!isPasswordCorrect) {
          throw new HttpException(
            'Credentials are not valid',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
    
        delete user.password;
        return user;
      }

    generateJwt(user: UserEntity): string {
        return sign(
            {
            id: user.id,
            username: user.username,
            email: user.email,
            },
            JWT_SECRET,
        );
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
       return {
           user: {
               ...user, // spread - все поля пользователя
               token: this.generateJwt(user)
           }
       } 
    }
}