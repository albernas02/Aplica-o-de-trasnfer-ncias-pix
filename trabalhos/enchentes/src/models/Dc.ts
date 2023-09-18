// import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
// import { Item } from "./Item";
// import { User } from "./User";
// import { Recipient } from "./Recipient";

// Entity('dcs')
// export class Dc extends BaseEntity{
//   @PrimaryGeneratedColumn()
//   public id: number;

//   @Column()
//   public town: string;

//   @Column()
//   public situation: string;

//   @Column()
//   public items_id: number;

//   @Column()
//   public users_id: number;

//   @Column()
//   public recipients_id: number;

//   @ManyToOne(() => Recipient, (recipient) => recipient.dcs)
//   @JoinColumn({ name: 'recipient_id' })
//   public recipient: Recipient;

//   @ManyToOne(() => User, (user) => user.dcs)
//   @JoinColumn({ name: 'users_id' })
//   public user: User;

//   @ManyToOne(() => Item, (item) => item.dcs)
//   @JoinColumn({ name: 'item_id' })
//   public item: Item;
// }
