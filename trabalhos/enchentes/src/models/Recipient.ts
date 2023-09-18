import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movement } from "./Movement";
import { Dc } from "./Dc";
import { Item } from "./Item";

@Entity('recipients')
export class Recipient extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column()
  public phone: string;

  @Column()
  public situation: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  public booked_at: string;

  @Column()
  public items_id: number

  @OneToMany(() => Dc , (dcs) => dcs.recipients_id)
  public dcs: Promise<Dc[]>

  @ManyToMany(() => Item , (items) => items.recipients_id)
  public items: Promise<Item[]>
}
