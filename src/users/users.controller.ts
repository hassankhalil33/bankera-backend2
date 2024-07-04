import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return {};
  };

  @Get("/:id")
  getUser(@Param("id") id: string ) {
    return { id };
  };

  @Post()
  createUser(@Body() body: {name: string, password: string, email: string}) {
    return body;
  };

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: {name: string, password: string, email: string}) {
    return {id, ...body};
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    return { id };
  };
};
