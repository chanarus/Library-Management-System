import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Library {
  @ObjectIdColumn()
  private id: ObjectID;

  @Column()
  public name: string;
}
