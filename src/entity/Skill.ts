import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
  } from "typeorm";
import { User } from "./User";
  
  @Entity('skill')
  export class Skill extends BaseEntity {
  
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column("varchar", { length: 255 })
    label: string;

    // @ts-ignore `type` is not being used
    @ManyToOne(type => User, user => user.ownedSkills)
    owner: User
  }
  