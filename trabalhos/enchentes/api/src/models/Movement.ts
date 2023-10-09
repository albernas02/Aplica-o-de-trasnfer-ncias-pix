import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Recipient } from "./Recipient";
import { Item } from "./Item";

@Entity('movements')
export class Movement extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp', default: 'NOW()' })
  public create_at: Date;

  @Column()
  public type: string;

  @Column()
  public town: string;

  @Column()
  public amount: number;

  @Column()
  public user_id: number;

  @Column()
  public item_id: number;

//   @Column({
//     type: 'text',
//     unique: true,
//     nullable: true,
// })
//   public doador: string|null

  @Column({
    type: 'text',
    unique: true,
    nullable: true,
})
  public recipient_id: number | null;

  @ManyToOne(() => User, (user) =>user.movements)
  @JoinColumn({name : 'user_id'})
  public user: Promise<User>;

  @ManyToOne(() => Recipient, (recipient) =>recipient.movements)
  @JoinColumn({name : 'recipient_id'})
  public recipient: Promise<Recipient>;

  @ManyToOne(() => Item, (item) =>item.id)
  @JoinColumn({name : 'item_id'})
  public item: Promise<Item>;


}


