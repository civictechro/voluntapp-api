import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
  } from "typeorm";
import { User } from "./User";
  
@Entity('project')
export class Project extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", { length: 255 })
    name: string;

    @Column("text")
    description: string;

    // @ts-ignore `type` is not being used
    @ManyToOne(type => User, user => user.assignedProjects)
    teamMember: User

    // @ts-ignore `type` is not being used
    @ManyToOne(type => User, user => user.projects)
    owner: User
}
  