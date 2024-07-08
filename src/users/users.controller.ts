import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  };

  @Get("/:username")
  getUser(@Param("username") username: string ) {
    return this.userService.getUser(username);
  };

  @Post()
  createUser(@Body() body: {username: string, password: string, email: string}) {
    return this.userService.createUser(body);
  };

  @Patch("/:username")
  updateUser(@Param("username") username: string, @Body() body: {username: string, password: string, email: string}) {
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
