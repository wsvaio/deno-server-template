import { serve, ServeInit } from "std/http/server.ts";
import { createCompose, middleware } from "./createCompose.ts";
import contentType from "./contentType.ts";
import toString from "./toString.ts";
import trying from "./trying.ts";

export default () => {
	const { use, error, final, run, plugin } = createCompose<ctx>();

  // 初始化ctx
  use(async ctx => {

    ctx.url = new URL(ctx.request.url);
    ctx.query = {};
    ctx.url.searchParams.forEach((val, key) => ctx.query[key] = val);

    ctx.method = ctx.request.method.toLowerCase();

    ctx.headers = new Headers();

    ctx.url.pathname == "/" && (ctx.url.pathname = "/index.html");
    ctx.ext = ctx.url.pathname.split(".").reverse()[0];

  });

  // 解析body
  use(async ctx => {
    if (["get", "delete"].includes(ctx.method)) return;

    const contentType = ctx.request.headers.get("Content-Type") ?? "";
    if (contentType.indexOf("multipart/form-data") != -1) {
      ctx.body = await ctx.request.formData();
    }
    else {
      ctx.body = await ctx.request.text();
      ctx.body = await trying(() => JSON.parse(ctx.body)).catch(() => ctx.body);
    }
  })
  

  error(async ctx => {
    ctx.data = ctx.error.message ?? ctx.data ?? "Error";
    ctx.status = ctx.error.status ?? ctx.status ?? 500;
    
  });

  final(async ctx => {
    ctx.data ?? (ctx.data = "404 not found", ctx.status = 404);
  });

  final(async ctx => {
    
    if (["[object Array]", "[object Object]"].includes(toString(ctx.data))) {
      await trying(() => {
        ctx.data = JSON.stringify(ctx.data);
        ctx.headers.set("Content-Type", "application/json;charset=utf-8");
      }).catch(() => {});
    }
    else if (toString(ctx.data) == "[object String]") ctx.headers.set("Content-Type", "text/plain;charset=utf-8");

    else if (toString(ctx.data) == "[object Uint8Array]") ctx.headers.set("Content-Type", `${contentType[`.${ctx.ext}`] ?? "text/plain"};charset=utf-8`);
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
