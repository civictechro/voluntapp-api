import { ResolverMap } from "../../types/graphql-utils";
//import * as casual from 'casual';
import { Project } from "../../entity/Project";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = { 
  Query: {
    project: (_, { id }) => {
      if (!id) {
        return;
      }
      
      return Project.findOne(id);
    },
    projects: async (_, {}) => {
      return await getRepository(Project)
        .createQueryBuilder('project')
        .getMany();
    }
  },  
  Mutation: {
    createProject: async (_, args) => {
      const {
        userId,
        name,
        description
      } = args;

      let project = Project.create({
        name: name,
        description: description
      });
      
      const user = await User.findOne({
        where: { id: userId },
        select: ['id']
      });

      if (!user) {
        return;
      }
      
      project.owner = user;
      return await project.save();
    },
    addProjectMember: async (_, args) => {
      const { id, userId } = args;

      const user = await User.findOne({
        where: { id: userId },
        select: ['id']
      });

      if (!user) {
        return;
      }

      const project = await Project.findOne({
        where: { id: id },
        select: ['id']
      });

      if (!project) {
        return;
      }

      user.assignedProjects.push(project);
      return await user.save();
    }
  }
}

