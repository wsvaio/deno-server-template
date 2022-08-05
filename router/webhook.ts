
import createRouter from "../application/createRouter.ts";


const router = createRouter("/webhook");

router.post("/", async (ctx, next) => {
  console.log("webhook", ctx.body);
  Deno.run({ cmd: ["git", "pull"] });
  ctx.data = "ok";
});

export default router;

       