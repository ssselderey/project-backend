import { ApiProperty } from "@nestjs/swagger";


export class CreatUserDto{
  @ApiProperty({example: 'vanchikova@mail.ru',description: 'Почтовый адрес'})
  readonly email:string;
  @ApiProperty({example: '458ds5',description: 'Пароль'})
  readonly password:string;
}