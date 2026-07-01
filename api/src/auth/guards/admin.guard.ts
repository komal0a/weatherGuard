import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { UserRole } from "../../users/schema/user.schema";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.usersService.findByClerkId(
      request.user.clerkId,
    );

    if (!user) {
      throw new ForbiddenException("User not found");
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        "Admin access required",
      );
    }

    return true;
  }
}