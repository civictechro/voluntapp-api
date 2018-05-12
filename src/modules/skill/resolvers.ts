import { ResolverMap } from "../../types/graphql-utils";
import * as casual from 'casual';
import { Skill } from "../../entity/Skill";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = { 
  Query: {
    skill: (_, { id }: GQL.ISkillOnQueryArguments) => {
      if (!id) {
        return;
      }
      
      return Skill.findOne(id);
    },
    skills: async (_, {}) => {
      return await getRepository(Skill)
        .createQueryBuilder('skill')
        .getMany();
    }
  }, 
  Mutation: {
    createSkill: async (_, { label }: GQL.ICreateSkillOnMutationArguments) => {
      let skill = Skill.create({
        label: label
      });
      
      return await skill.save();
    },
    generateSkill: async () => {
      let skill = Skill.create({
        label: casual.word
      });
      
      return await skill.save();
    },
    addSkill: async (_, { id, userId }) => {
      const skill = await Skill.findOne({
        where: { id: id },
        select: ['id']
      });

      if (!skill) {
        return;
      }
      
      const user = await User.findOne({
        where: { id: userId },
        select: ['id']
      });

      if (!user) {
        return;
      }
      
      skill.owner = user;
      return await skill.save();
    },
  }, 
}

