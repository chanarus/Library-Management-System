import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Library {
  @ObjectIdColumn()
  private id: ObjectID;

  @Column()
  public name: string;

  @Column()
  public active: boolean;

  @Column()
  public location: string;

  @Column()
  public address: string;

  @Column()
  public contactNo: string;
}
