
import createRouter from "../application/createRouter.ts";


const router = createRouter("/webhook");

router.post("/", async ctx => {
  console.log("webhook", ctx.body);
  Deno.run({ cmd: ["git", "pull"] });
});

export default router;

       