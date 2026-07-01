import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestAccessDto } from './dto/request-access.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post('request-access')
  async requestAccess(@Body() body: RequestAccessDto) {
    return await this.usersService.requestAccess(body);
  }

  @Get('pending')
  async getPending() {
    return await this.usersService.getPendingUsers();
  }

  @Patch('approve/:id')
  async approve(@Param('id') id: string) {
    return await this.usersService.approveUser(id);
  }
  @Get("approved-count")
async approvedCount() {
  const count = await this.usersService.getApprovedCount();

  return {
    count,
  };
}
@Get("me/:clerkId")
getCurrentUser(
  @Param("clerkId") clerkId: string,
) {
  return this.usersService.getCurrentUser(
    clerkId,
  );
}
}