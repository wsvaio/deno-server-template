import createRouter from "../application/createRouter.ts";
import article from "../mongo/article.ts";
import { ObjectId } from "mongo/mod.ts";
import omit from "../application/omit.ts";
import pick from "../application/pick.ts";
const router = createRouter("/article");

router.post("/", async (ctx) => {
	const date = new Date();
	ctx.data = await article.insertOne({
		...ctx.body,
		updated_at: date,
		created_at: date,
	});
});

router.get("/", async (ctx) => {
	const { page = 1, pageSize = 10, key = "" } = ctx.query;
	const items = await article.find({
		content: {$regex: key}
	}, {
		skip: (page - 1) * pageSize,
		limit: +pageSize,
		sort: {id: 1},
	}).toArray();
	const count = await article.countDocuments({content: {$regex: key}});
	ctx.data = { page, pageSize, items, count };
});

router.del("/", async (ctx) => {
	const _ids = ctx.url.searchParams.getAll("_ids").map((_id) => new ObjectId(_id));
	ctx.data = await article.deleteMany({ _id: { $in: _ids } });
});

router.put("/:_id", async (ctx) => {
	ctx.data = await article.updateOne({ _id: new ObjectId(ctx.param._id) }, {
		$set: { updated_at: new Date(), ...omit(ctx.body, "_id") },
	});
});



export default router;
