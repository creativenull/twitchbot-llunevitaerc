import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { addCommand, getCommands } from "./controllers/command_controller.ts";
import { getQuestions } from "./controllers/question_controller.ts";
import { getSingleUser, getUsers } from "./controllers/user_controller.ts";

const router = new Router();

// Commands
router.get("/commands", getCommands);
router.post("/commands", addCommand);

// Questions
router.get("/questions", getQuestions);

// Users
router.get("/users", getUsers);
router.get("/users/:id", getSingleUser);

export default router;
