// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
project: IProject;
projects: Array<IProject>;
skill: ISkill;
skills: Array<ISkill>;
user: IUser;
users: Array<IUser>;
}

interface IProjectOnQueryArguments {
id?: string | null;
}

interface ISkillOnQueryArguments {
id?: string | null;
}

interface IUserOnQueryArguments {
id?: string | null;
}

interface IProject {
__typename: "Project";
id: string;
name: string;
description: string;
creator: IUser;
members: Array<IUser>;
}

interface IUser {
__typename: "User";
id: string;
name: string;
email: string;
photo: string | null;
phone: string | null;
location: string | null;
job: string | null;
skills: Array<ISkill>;
projectsMember: Array<IProject>;
projectsCreator: Array<IProject>;
}

interface ISkill {
__typename: "Skill";
id: string;
label: string;
}

interface IMutation {
__typename: "Mutation";
createProject: IProject | null;
addProjectMember: IUser | null;
createSkill: ISkill | null;
addSkill: IUser | null;
generateSkill: ISkill | null;
createUser: IUser | null;
generateUser: IUser | null;
}

interface ICreateProjectOnMutationArguments {
userId: string;
name: string;
description: string;
}

interface IAddProjectMemberOnMutationArguments {
id: string;
userId: string;
}

interface ICreateSkillOnMutationArguments {
id: string;
label: string;
}

interface IAddSkillOnMutationArguments {
id: string;
userId: string;
}

interface ICreateUserOnMutationArguments {
name: string;
email: string;
photo?: string | null;
phone?: string | null;
location?: string | null;
job?: string | null;
}
}

// tslint:enable
