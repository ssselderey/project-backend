import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreatUserDto } from "./dto/creat-user-dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { Roles } from "../auth/roles.auth.decorate";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add.role.dto";
import { BanUserDto } from "./dto/ban.user.dto";


@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

  constructor(private userService:UsersService) {
  }
  @ApiOperation({summary:'Создание пользователей'})
  @ApiResponse({status:200,type: User})
  @Post()
  create(@Body() userDto: CreatUserDto){
    return this.userService.createUsers(userDto);
  }

  @ApiOperation({summary:'Получить всех пользователей'})
  @ApiResponse({status:200,type: [User]})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.userService.getUsers()
  }

  @ApiOperation({summary:'Выдать роль'})
  @ApiResponse({status:200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto){
    return this.userService.addRole(dto);
  }

  @ApiOperation({summary:'Забанить пользователя'})
  @ApiResponse({status:200})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto){
    return this.userService.ban(dto);
  }
}
