const url = "http://localhost:8000";

export interface Command {
  name: string;
  type: string;
  response: string;
}

export async function getCommands() {
  const res = await fetch(`${url}/commands`, {
    headers: {
      accept: "application/json",
    },
  });

  if (res.ok) {
    return (await res.json()) as Command[];
  }

  throw new Error("Failed fetching commands");
}

export function addCommand(data: Command) {
  fetch(`${url}/commands/add`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
