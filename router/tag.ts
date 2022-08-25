import createRouter from "../application/createRouter.ts";
import tag from "../mongo/tag.ts";
import { ObjectId } from "mongo/mod.ts";
import omit from "../application/omit.ts";
import pick from "../application/pick.ts";
const router = createRouter("/api/tag");

router.post("/", async (ctx) => {
	const date = new Date();
	ctx.data = await tag.insertOne({
		...ctx.body,
		updated_at: date,
		created_at: date,
	});
});

router.get("/", async (ctx) => {
	const { page = 1, pageSize = 10, key = "" } = ctx.query;
	const items = await tag.find({
    name: { $regex: new RegExp(key, "i") }
  }, {
    skip: (page - 1) * pageSize,
    limit: +pageSize,
    sort: {_id: 1},
  }).toArray();
	const count = await tag.countDocuments({ name: { $regex: new RegExp(key, "i") } });
	ctx.data = { page, pageSize, items, count };
});

router.put("/:_id", async ctx => {
  ctx.data = await tag.updateOne({_id: new ObjectId(ctx.param._id)}, {
    $set: { updated_at: new Date(), ...omit(ctx.body, "_id") },
  });
});

router.del("/", async (ctx) => {
	const _ids = ctx.url.searchParams.getAll("_ids").map((_id) => new ObjectId(_id));
	ctx.data = await tag.deleteMany({ _id: { $in: _ids } });
});


export default router;
