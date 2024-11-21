/* eslint-disable @typescript-eslint/no-unused-vars */
namespace USER {
  type getUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    image?: string;
  }[];

  type getUserRequest = void;

  type postUserResponse = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
  };

  type postUserRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string;
  };

  type updateUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
  };

  type updateUserRequest = {
    id: number;
    firstName: string;
    lastName: string;
  };

  type deleteUserResponse = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };

  type deleteUserRequest = number;
}
