import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: "user"})
export class UserEntity {

    @PrimaryGeneratedColumn("increment")
    id: number; 

    @Column({type: "varchar", length: 255, unique: true})
    username: string;

    @Column({type: "varchar", length: 255})
    password: string

    @Column({type: "varchar", length: 255, unique: true})
    email: string

    
}