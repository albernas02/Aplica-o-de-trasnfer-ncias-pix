import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { Category } from "./Category";

@Entity('items')
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
  public category_id: number;

  @ManyToOne(() => Category, (category) => category.item)
  @JoinColumn({ name: 'categories_id' })
  public recipient: Promise<Category>;
}
