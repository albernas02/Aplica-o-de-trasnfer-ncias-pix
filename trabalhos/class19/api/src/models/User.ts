import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movement } from "./Movement";
import { Dc } from "./Dc";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  public booked_at: string;

  @Column()
  public situation: string;

  @OneToMany(() => Movement, (movements) => movements.user)
  public movements: Movement[];

  @ManyToOne(() => Dc, (dc) => dc.users)
  @JoinColumn({name: 'dc_id'})
  public dc: Promise<Dc>


}
