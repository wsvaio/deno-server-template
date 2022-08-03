
import createRouter from "../application/createRouter.ts";


const router = createRouter("/webhook");

router.post("/", async ctx => {
  Deno.run({ cmd: ["git", "pull"] });
});

export default router;

       