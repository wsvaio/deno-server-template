export default (path: string) => {
  return async (ctx: ctx) => {
    if (ctx.method.toLowerCase() != "get" || !ctx.ext || ctx.data) return;
    const pathname = ctx.url.pathname;
    ctx.data = await Deno.readFile(`${path}${pathname}`).catch(async () => await Deno.readFile("/index.html"));
  }
}

