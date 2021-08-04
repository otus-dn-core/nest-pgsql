import { IsEmail } from "class-validator";

export class UpdateUserDto {
    readonly username: string;
    @IsEmail()
    readonly email: string;
    readonly password: string;
    readonly forself: string;
    readonly image: string;
  }