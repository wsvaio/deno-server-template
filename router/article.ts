import createRouter from "../application/createRouter.ts";
import article, { ArticleSchema } from "../mongo/article.ts";
import { Filter, ObjectId } from "mongo/mod.ts";
import omit from "../application/omit.ts";
import pick from "../application/pick.ts";
import tag from "../mongo/tag.ts";
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
	const tag_ids = await tag.find({ name: { $regex: new RegExp(key, 'i') } }).map(item => item._id.toString());
	const filter: Filter<ArticleSchema> = {
		$or: [
			{
				title: {$regex: new RegExp(key, 'i')},
			},
			{
				tag_ids: { $elemMatch: { $in: tag_ids } }
			}
		],
	}
	const items = await article.find(filter, {
		skip: (page - 1) * pageSize,
		limit: +pageSize,
		sort: {id: 1},
	}).toArray();
	const count = await article.countDocuments(filter);
	ctx.data = { page, pageSize, items, count };
});

router.get("/:_id", async ctx => {
	
	ctx.data = await article.findOne({ _id: new ObjectId(ctx.param._id) });
})

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
