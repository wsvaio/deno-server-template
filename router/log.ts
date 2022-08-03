import createRouter from "../application/createRouter.ts";
import toString from "../application/toString.ts";



const router = createRouter("/log");

router.get("/", async ctx => ctx.data = [...Deno.readDirSync("./static/log")].map(item => item.name));

router.final(async ctx => {
  
  const text = `[${new Date().toLocaleString()}] ${ctx.method} ${toString(ctx.body)} ${ctx.url.pathname}${ctx.url.search} ${ctx.status ?? 200} ${toString(ctx.data)}`;
  Deno.writeTextFile(`./static/log/${new Date().toLocaleDateString().replaceAll("/", "-")}.log`, text + "\n", {append: true});
  console.log(text);

});



export default router;