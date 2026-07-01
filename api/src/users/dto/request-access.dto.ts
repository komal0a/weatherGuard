import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestAccessDto {
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}