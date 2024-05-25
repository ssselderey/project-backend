import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatUserDto } from "../users/dto/creat-user-dto";
import { AuthService } from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private  authService: AuthService) {
  }

  @Post('/login')
  login(@Body() userDto: CreatUserDto){
    return this.authService.login(userDto)
  }
  @Post('/registration')
  registration(@Body() userDto: CreatUserDto){
    return this.authService.registration(userDto)

  }
}
