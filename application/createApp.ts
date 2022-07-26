import { serve, ServeInit } from "std/http/server.ts";
import { createCompose, middleware } from "./createCompose.ts";
import toString from "./toString.ts";
import trying from "./trying.ts";

export default () => {
	const { use, error, final, run, plugin } = createCompose<ctx>();

  // 初始化ctx
  use(async ctx => {

    ctx.url = new URL(ctx.request.url);

    ctx.query = {};
    ctx.url.searchParams.forEach((val, key) => ctx.query[key] = val);

    ctx.body = await ctx.request.text();
    ctx.body = await trying(() => JSON.parse(ctx.body)).catch(() => ctx.body);

    ctx.method = ctx.request.method;



    ctx.headers = new Headers();


    ctx.url.pathname == "/" && (ctx.url.pathname = "/index.html");
    ctx.ext = ctx.url.pathname.split(".")[1];

  });

  error(async ctx => {
    ctx.data = ctx.error.message;
    ctx.status = 500;
  });

  final(async ctx => {
    ctx.data ?? (ctx.data = "404 not found", ctx.status = 404);
  });

  final(async ctx => {
    if (["[object Array]", "[object Object]"].includes(toString(ctx.data))) {
      ctx.headers.set("Content-Type", "application/json;charset=utf-8");
      ctx.data = await trying(() => JSON.stringify(ctx.data)).catch(() => ctx.data);
    }
    else if (toString(ctx.data) == "[object String]") ctx.headers.set("Content-Type", "text/plain;charset=utf-8");

    else if (toString(ctx.data) == "[object Uint8Array]") {
      const ext = ctx.ext;

      const contentType = ext == "html" ? "text/html"
      : ext == "css" ? "text/css"
      : ext == "js" ? "application/javascript"
      : ext == "png" ? "image/png"
      : ext == "ico" ? "image/x-icon"
      : ext == "jpg" ? "image/jpeg"
      : "text/plain"
      ctx.headers.set("content-type", contentType + ";charset=utf-8");
    }
    console.log(toString(ctx.data))
  });

  return {

    
    use, error, final, plugin,
    listen: async (options = <ServeInit>{ port: 4396 }) => serve(async request => {
      const ctx = <ctx>{ request };
      await run(ctx);
      const { headers, status, data } = ctx;
      return new Response(data, { headers, status });
    }, options),

  }


};
