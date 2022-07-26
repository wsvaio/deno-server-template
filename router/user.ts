import createRouter from "../application/createRouter.ts";
import user from "../mongo/user.ts";

const router = createRouter("/user");




router.get("/", async ctx => {
  // user.insertOne({"password": "pwd", "username": "usn"});
  ctx.data = await user.find().toArray();
  
});






export default router;