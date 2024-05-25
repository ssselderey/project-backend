import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreatUserDto } from "../users/dto/creat-user-dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

import { generate } from "rxjs";
import { annotateModelWithIndex } from "sequelize-typescript";


@Injectable()
export class AuthService {

  constructor(private  userService:UsersService,
              private jwtService: JwtService) {
  }
  async login(userDto: CreatUserDto){
    const user = await this.validateUser(userDto)
    return this.generateToken(user)

  }

  async registration( userDto: CreatUserDto){
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if(candidate){
      throw new HttpException('Пользователь с таким же email существует', HttpStatus.BAD_REQUEST)
    }
    //хэшируем пароль
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.createUsers({...userDto,password: hashPassword})
    return  this.generateToken(user)
  }
  private async generateToken(user){
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    }
  }
   private async validateUser(userDto: CreatUserDto){
    const user = await this.userService.getUserByEmail(userDto.email)
    const  passwordEquals = await bcrypt.compare(userDto.password,user.password);
    if(user && passwordEquals){
      return user;
    }
    throw new UnauthorizedException({massage: 'Некорректный email или пароль'})

  }
}
