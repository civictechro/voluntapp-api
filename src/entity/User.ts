import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany
  } from "typeorm";
import { Skill } from "./Skill";
import { Project } from "./Project";
  
  @Entity('user')
  export class User extends BaseEntity {
  
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column("varchar", { length: 255 })
    email: string;
  
    @Column("text")
    name: string;

    @Column("varchar", {length: 512 })
    photo: string;
    
    @Column("varchar", {length: 16})
    phone: string;
    
    @Column("varchar", {length: 32})
    location: string
    
    @Column("varchar", {length: 64})
    job: string;
    
    // @ts-ignore `type` is not being used
    @OneToMany(type => Skill, skill => skill.owner)
    ownedSkills: Skill[];

    // @ts-ignore `type` is not being used
    @OneToMany(type => Project, project => project.teamMember)
    assignedProjects: Project[];

    // @ts-ignore `type` is not being used
    @OneToMany(type => Project, project => project.owner)
    projects: Project[];

  }
  