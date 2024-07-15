import { Controller, Get, Param, Body, Delete, Patch, UseGuards, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dtos/updateuser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthGuard("access"), AuthGuard("refresh"))
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUser(@Req() req, @Res() res ) {
    return this.userService.getUser(req, res);
  };

  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Get("/all")
  getAllUsers(@Res() res) {
    return this.userService.getUsers(res);
  };

  @Patch("/:username")
  updateUser(@Param("username") username: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(username, body);
  };

  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @Delete()
  deleteAll() {
    return this.userService.deleteAllUsers();
  };

  @Delete("/:username")
  deleteUser(@Param("username") username: string) {
    return this.userService.deleteUser(username);
  };
};
