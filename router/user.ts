import createRouter from "../application/createRouter.ts";
import user from "../mongo/user.ts";
import { create, verify, Header } from "djwt/mod.ts";
import to from "../application/to.ts";
import merge from "../application/merge.ts";

const router = createRouter("/user");

const key = await crypto.subtle.generateKey({ name: "HMAC", hash: "SHA-512" }, true, ["sign", "verify"]);
const header: Header = { alg: 'HS512' };


router.post("/login", async (ctx, next) => {
  const { username="", password="" } = ctx.body;
  const data = await user.findOne({ username, password });
  if (!data) return Promise.reject({ message: "登录失败，账号或密码错误", status: 400 });
  const token = await create(header, { ...data, exp: Date.now() + 3600 }, key);
  ctx.data = { token, expire: Date.now() + 3600 };
});



router.use(async ctx => {
  ctx.auth = async () => {
    const auth = ctx.request.headers.get("Authentication") ?? "";
    const [err, data] = await to(verify(auth, key));
    if (err) return Promise.reject({ message: "登录认证失败，请重新登录", status: 401 });
    return ctx.user = data;
  }
  if (ctx.method != "get") await ctx.auth();
  
});


router.get("/", async ctx => ctx.data = await ctx.auth());



export default router;