import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("customer")
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 255, nullable: false })
    name: string

    @Column({ unique: true })
    mobilePhone: string

    @Column({ nullable: false })
    balance: number
}