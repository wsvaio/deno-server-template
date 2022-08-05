import createRouter from "../application/createRouter.ts";
import toString from "../application/toString.ts";



const router = createRouter("/log");

router.get("/", async ctx => ctx.data = [...Deno.readDirSync("./static/log")].map(item => item.name));

router.final(async ctx => {
  
  const host = ctx.request.headers.get("Host");
  const text = `[${new Date().toLocaleString()}] ${host} ${ctx.method} ${ctx.status ?? 200} ${ctx.url.pathname}${ctx.url.search}`;
  Deno.writeTextFile(`./static/log/${new Date().toLocaleDateString().replaceAll("/", "-")}.log`, text + "\n", {append: true});
  console.log(text);
  

});



export default router;