import { ResolverMap } from "../../types/graphql-utils";
import * as casual from 'casual';
import { User } from "../../entity/User";
import { getRepository } from "typeorm";

export const resolvers: ResolverMap = { 
  Query: {
    user: (_, { id }: GQL.IUserOnQueryArguments) => {
      if (!id) {
        return;
      }
      
      return User.findOne(id);
    },
    users: async (_, {}) => {
      return await getRepository(User)
        .createQueryBuilder('user')
        .getMany();

    } 
  },  
  Mutation: {
    createUser: async (_, args: GQL.ICreateUserOnMutationArguments) => {
      const {
        name, 
        email,
        photo,
        phone,
        location,
        job
      } = args;

      let user = User.create({
        name: name,
        email: email,
        photo: photo ? photo : '',
        location: location ? location : '',
        job: job ? job : '',
        phone: phone ? phone : ''
      });
      
      return await user.save();
      
    },
    generateUser: async() => {
      let user = User.create({
        name: casual.name,
        email: casual.email,
        photo: "https://grsj2016.sites.olt.ubc.ca/files/2017/09/cropped-PROFILEPLACEHOLDER.png",
        location: casual.country + ', ' + casual.city,
        job: casual.word,
        phone: casual.phone
      });
      
      return await user.save();
    }
  }
}

