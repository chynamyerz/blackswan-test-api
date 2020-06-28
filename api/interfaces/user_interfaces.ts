// Define user create input interface.
interface IUserCreateInput {
  first_name: string;
  last_name: string;
  username: string;
}

// Define user arg interface.
interface IUserArg extends IUserCreateInput {
  id: number | string;
  first_name: string;
  last_name: string;
  username: string;
}

// Define user update by id input interface.
interface IUserUpdateByIdInput {
  id: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

// Define user get by id input interface.
interface IUserGetByIdInput {
  id: number | string;
}

// Define user delete by id input interface.
interface IUserDeleteByIdInput {
  id: number | string;
}

export {
  IUserCreateInput,
  IUserArg,
  IUserUpdateByIdInput,
  IUserGetByIdInput,
  IUserDeleteByIdInput,
};
