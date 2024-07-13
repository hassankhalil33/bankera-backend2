import { Controller, Get, Param, Body, Delete, Patch, UseGuards, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthGuard("access"), AuthGuard("refresh"))
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Get()
  getAllUsers(@Response() res) {
    return this.userService.getUsers(res);
  };

  @Get("/:username")
  getUser(@Param("username") username: string, @Response() res ) {
    return this.userService.getUser(res, username);
  };

  @Patch("/:username")
  updateUser(@Param("username") username: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(username, body);
  };

  @Delete()
  deleteAll() {
    return this.userService.deleteAllUsers();
  };

  @Delete("/:username")
  deleteUser(@Param("username") username: string) {
    return this.userService.deleteUser(username);
  };
};
