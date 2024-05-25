import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user.roles.model";

interface UserCreationAttrs{
  email:string;
  password:string;
}
@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttrs >{
  @ApiProperty({example: '12345',description: 'Уникальный индентификатор'})
  @Column({type: DataType.INTEGER, unique:true,autoIncrement: true, primaryKey: true })

  id:number;
  @ApiProperty({example: 'vanchokova@mail.ru',description: 'Почтовый адрес'})
  @Column({type: DataType.STRING, unique:true, allowNull: false })
  email:string;
  @ApiProperty({example: '458ds5',description: 'Пароль'})
  @Column({type: DataType.STRING, allowNull: false})

  password:string;
  @ApiProperty({example: 'true',description: 'Забанен пользователь или нет'})
  @Column({type: DataType.BOOLEAN, defaultValue:false})
  banned: boolean;
  @Column({type: DataType.STRING, allowNull: true })
  @ApiProperty({example: 'За хулиганство',description: 'Причина бана'})
  banReason: string;

  //Связь таблиц многим ко многим от Пользователя к Ролям и Роли к Пользователям
  @BelongsToMany(()=> Role, ()=> UserRoles)
  roles: Role[];




}