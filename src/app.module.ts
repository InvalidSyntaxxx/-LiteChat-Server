/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2023-02-25 12:17:23
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-02-26 15:43:37
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { FriendModule } from './modules/friend/friend.module';
import { GroupModule } from './modules/group/group.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'rm-2ze03qh9385jbo2m12o.rwlb.rds.aliyuncs.com',  // 数据库地址，本地服务则填 localhost
      username: 'redamancy9189', // 数据库用户名
      password: 'WANGchen0809', // 数据库密码。 麻烦给个star谢谢，https://github.com/InvalidSyntaxxx/LiteChat-Server
      database: 'chat',
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true
    }),
    UserModule,
    ChatModule,
    FriendModule,
    GroupModule,
    AuthModule
  ],
})
export class AppModule {}
