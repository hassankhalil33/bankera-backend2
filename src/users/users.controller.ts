import { Controller, Get, Param, Body, Delete, Patch, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  };

  @UseGuards(AuthGuard("access"))
  @UseGuards(AuthGuard("refresh"))
  @Get("/:username")
  getUser(@Param("username") username: string ) {
    return this.userService.getUser(username);
  };

  @UseGuards(AuthGuard("access"))
  @UseGuards(AuthGuard("refresh"))
  @Patch("/:username")
  updateUser(@Param("username") username: string, @Body() body: {username: string, password: string, email: string}) {
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
