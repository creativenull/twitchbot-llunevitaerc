import { db } from "../db.ts";

export interface Command {
  name: string;
  type: string;
  response: string;
}

export function getCommands(): Command[] {
  const q = db.prepareQuery("SELECT name,type,response FROM commands;");
  const res = q.all();
  let commands: Command[] = [];

  for (const result of res) {
    commands.push({
      name: result[0],
      type: result[1],
      response: result[2],
    } as Command);
  }

  return commands;
}

function validateAdd(data: Command) {
  if (data.name && data.type && data.response) {
    return data;
  }

  throw new Error("Invalid data");
}

export function addCommand(data: Command) {
  const validData = validateAdd(data)
  const insertQuery = db.prepareQuery(
    "INSERT INTO commands (name,type,response) VALUES (:name,:type,:response);",
  );
  insertQuery.execute({ ...validData });

  const countQuery = db.prepareQuery(
    "SELECT COUNT(*) FROM commands WHERE name = :name;",
  );
  const [count] = countQuery.one({ name: validData.name });

  if (!count) {
    throw new Error("Could not write to db");
  }
}
