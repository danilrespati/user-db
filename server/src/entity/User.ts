import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ type: "numeric", nullable: false, unique: true })
  nik: number;

  @Column({ type: "text", nullable: false })
  fullName: string;

  @Column({ type: "text" })
  gender: string;

  @Column({ type: "date" })
  bornDate: Date;

  @Column({ type: "text" })
  address: string;

  @Column({ type: "text" })
  nationality: string;
}
