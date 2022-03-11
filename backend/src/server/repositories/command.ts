import { db } from "../db.ts";
import { CommandResponse } from "../shared/command.ts";

const allQuery = db.prepareQuery("SELECT name,type,response FROM commands;");
const insertQuery = db.prepareQuery("INSERT INTO commands (name,type,response) VALUES (:name,:type,:response);");
const countQuery = db.prepareQuery("SELECT COUNT(*) FROM commands WHERE name = :name;");
const getQuery = db.prepareQuery("SELECT response FROM commands WHERE name = :name;");

export function queryAllCommands(): CommandResponse[] {
  const res = allQuery.all();
  const commands: CommandResponse[] = [];

  for (const result of res) {
    commands.push({
      name: result[0],
      type: result[1],
      response: result[2],
    } as CommandResponse);
  }

  return commands;
}

function validateAdd(data: CommandResponse) {
  if (data.name && data.type && data.response) {
    return data;
  }

  throw new Error("Invalid data");
}

export function createSingleCommand(data: CommandResponse) {
  const validData = validateAdd(data);
  insertQuery.execute({ ...validData });

  const [count] = countQuery.one({ name: validData.name });

  if (!count) {
    throw new Error("Could not write to db");
  }
}

export function getSingleCommand(name: string) {
  const result = getQuery.one({ name });

  return result;
}
