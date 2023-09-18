import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Movement} from "./Movement";

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @Column()
  public situation: string;

  @OneToMany(() => Movement, (movements) => movements.category_id)
  public movements: Promise<Movement[]>;
}
