import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { UserRoles } from "./user.roles.model";

interface RoleCreationAttrs{
  value:string;
  description:string;
}
@Table({tableName:'Role'})
export class Role extends Model<Role,RoleCreationAttrs >{
  @ApiProperty({example: '12345',description: 'Уникальный индентификатор'})
  @Column({type: DataType.INTEGER, unique:true,autoIncrement: true, primaryKey: true })
  id:number;

  @ApiProperty({example: 'ADMIN',description: 'Уникальное значение роли пользователя'})
  @Column({type: DataType.STRING, unique:true, allowNull: false })
  value:string;

  @ApiProperty({example: 'Администратор',description: 'Описание роли'})
  @Column({type: DataType.STRING, allowNull: false})
  description:string;

  //Связь таблиц многим ко многим от Пользователя к Ролям и Роли к Пользователям
  @BelongsToMany(()=> User, ()=> UserRoles)
  users: User[];


}