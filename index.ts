import createApp from "./application/createApp.ts";
import user from "./router/user.ts";
import createStatic from "./application/static.ts";
const app = createApp();


app.use(async ctx => {

  // console.log(ctx);
});

app.plugin(user);

app.use(createStatic("./static"));

app.listen();

