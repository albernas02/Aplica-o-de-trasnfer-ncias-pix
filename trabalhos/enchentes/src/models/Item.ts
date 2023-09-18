import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Dc } from "./Dc";
import { Recipient } from "./Recipient";

Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public  description: string;

  @Column()
  public amount: number;

  @Column()
  public situation: string;

  @Column()
  public recipients_id: number;

  @OneToMany(() => Dc, (dcs) => dcs.users_id)
  public dcs: Promise<Dc[]>

  @ManyToMany(() => Recipient, (recipient) => recipient.items_id)
  @JoinColumn({ name: 'recipient_id' })
  public recipient: Promise<Recipient[]>;
}
