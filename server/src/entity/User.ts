import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ type: "numeric", nullable: false, unique: true })
  nik: number;

  @Column({ type: "text", nullable: false })
  fullName: string;

  @Column({ type: "text", nullable: true })
  gender: string;

  @Column({ type: "date", nullable: true })
  bornDate: Date;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ type: "text", nullable: true })
  nationality: string;
}
