// Define user task create input interface.
interface IUserTaskCreateInput {
  date_time: string;
  description: string;
  next_execute_date_time?: string;
  name: string;
  status: string;
  user_id: number | string;
}

// Define user task arg interface.
interface IUserTaskArg extends IUserTaskCreateInput {
  date_time: string;
  description: string;
  next_execute_date_time?: string;
  name: string;
  status: string;
  task_id: number | string;
  user_id: number | string;
}

// Define user task update by id input interface.
interface IUserTaskUpdateByIdInput {
  date_time?: string;
  description?: string;
  next_execute_date_time?: string;
  name?: string;
  status?: string;
  task_id: number | string;
  user_id: number | string;
}

// Define user task get by id input interface.
interface IUserTaskGetByIdInput {
  task_id: number | string;
  user_id: number | string;
}

// Define user task delete by id input interface.
interface IUserTaskDeleteByIdInput {
  task_id: number | string;
  user_id: number | string;
}

export {
  IUserTaskCreateInput,
  IUserTaskArg,
  IUserTaskUpdateByIdInput,
  IUserTaskDeleteByIdInput,
  IUserTaskGetByIdInput,
};
