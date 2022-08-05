import createApp from "./application/createApp.ts";
import user from "./router/user.ts";
import upload from "./router/upload.ts";
import log from "./router/log.ts";
import webhook from "./router/webhook.ts";
import createStatic from "./application/createStatic.ts";

const app = createApp();


app.use(async ctx => {
  // const origin = ctx.request.headers.get("origin") ?? "http://localhost:3000";
  // if (allowOrigin.includes(origin)) {

  // }
  ctx.headers.set("Access-Control-Allow-Origin", "*");
  // ctx.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ctx.headers.set("Content-Security-Policy", "upgrade-insecure-requests");
  // ctx.headers.set("Access-Control-Allow-Methods", "*");
});


app.plugin(webhook, user, upload, log);

app.use(createStatic("./static"));

app.listen({ port: 80 });


