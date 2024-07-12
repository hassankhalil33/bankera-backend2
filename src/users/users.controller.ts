import { Controller, Get, Param, Body, Delete, Patch, UseGuards, Response } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/updateuser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(@Response() res) {
    return this.userService.getUsers(res);
  };

  @UseGuards(AuthGuard("access"))
  @UseGuards(AuthGuard("refresh"))
  @Get("/:username")
  getUser(@Param("username") username: string, @Response() res ) {
    return this.userService.getUser(res, username);
  };

  @UseGuards(AuthGuard("access"))
  @UseGuards(AuthGuard("refresh"))
  @Patch("/:username")
  updateUser(@Param("username") username: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(username, body);
  };

  @Delete()
  deleteAll() {
    return this.userService.deleteAllUsers();
  };

  @UseGuards(AuthGuard("access"))
  @UseGuards(AuthGuard("refresh"))
  @Delete("/:username")
  deleteUser(@Param("username") username: string) {
    return this.userService.deleteUser(username);
  };
};
