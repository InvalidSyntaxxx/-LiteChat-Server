/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2023-02-25 12:17:23
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-03-01 13:50:23
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { User } from '../user/entity/user.entity';
import { Group, GroupMap } from '../group/entity/group.entity';
import { GroupMessage } from '../group/entity/groupMessage.entity';
import { UserMap } from '../friend/entity/friend.entity';
import { FriendMessage } from '../friend/entity/friendMessage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Group, GroupMap, GroupMessage, UserMap, FriendMessage])
  ],
  providers: [ChatGateway],
})
export class ChatModule {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}
  async onModuleInit() {
    const defaultGroup = await this.groupRepository.find({groupName: 'LiteChat聊天室'});
    if(!defaultGroup.length) {
      await this.groupRepository.save({
        groupId: 'LiteChat聊天室',
        groupName: 'LiteChat聊天室',
        userId: 'wyz',
        createTime: new Date().valueOf()
      });
      console.log('create default group LiteChat聊天室');
    }
  }
}
