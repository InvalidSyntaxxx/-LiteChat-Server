/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2023-02-25 12:17:23
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-02-26 23:05:09
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column({ default: 'ikun' })
  username: string;

  @Column({ default: '123456', select: false })
  password: string;

  @Column({ default: 'qiaobiluo.png' })
  avatar: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 'on' })
  status: string;

  @Column({ default: '' })
  tag: string;

  @Column({type: 'double',default: new Date().valueOf()})
  createTime: number;
}
