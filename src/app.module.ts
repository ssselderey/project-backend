import {Module} from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user.roles.model";
import { RolesController } from "./roles/roles.controller";
import { AuthModule } from './auth/auth.module';


import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
      }
    ),
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'backend',
    models: [User,Role, UserRoles],
    autoLoadModels: true
  }),
  UsersModule,
  RolesModule,
  AuthModule,
  FilesModule,]
})

export class AppModule {}