import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { User } from "./User";
import { Recipient } from "./Recipient";

@Entity('dcs')
export class Dc extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public town: string;

  @Column()
  public situation: string;

  @OneToMany(() => Recipient, (recipients) => recipients.dc)
  public recipients: Recipient[];

  @OneToMany(() => User, (user) => user.dc)
  public users: User[];

}
