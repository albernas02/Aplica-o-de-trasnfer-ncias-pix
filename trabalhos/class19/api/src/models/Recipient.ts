import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movement } from "./Movement";
import { Dc } from "./Dc";

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
  public dc_id: number;

  @ManyToOne(() => Dc, (dc) => dc.recipients)
  @JoinColumn({name: 'dc_id'})
  public dc: Promise<Dc>

  @OneToMany(() => Movement, (movements) => movements.recipient)
  public movements: Movement[];
}
