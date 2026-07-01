import { IsMongoId } from 'class-validator';

export class ApproveUserDto {
  @IsMongoId()
  id: string;
}