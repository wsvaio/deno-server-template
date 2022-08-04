import createRouter from "../application/createRouter.ts";
import toString from "../application/toString.ts";
import merge from "../application/merge.ts";


const router = createRouter("/upload");




router.post("/", async ctx => {

  if (toString(ctx.body) != "[object FormData]") return;

  const files: File[] = ctx.body.getAll("files");

  ctx.data = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    await Deno.writeFile(`./static/upload/${encodeURI(file.name)}`, new Uint8Array(arrayBuffer));
    ctx.data.push(file.name);
  }
  
  
});

router.del("/.*", async ctx => {
  await Deno.remove("./static" + ctx.url.pathname);
  ctx.data = ctx.url.pathname.split("/").at(-1);
});


router.get("/", async ctx => ctx.data = [...Deno.readDirSync("./static/upload")].map(item => item.name));





export default router;