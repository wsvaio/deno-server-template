import { createCompose, middleware } from "./createCompose.ts";

type param = {param: obj};
export default (path="") => {
  const { useList, errorList, finalList, use, error, final } = createCompose<ctx>();

  function methodUse(method: string) {
    return (url: string, ...middleware: middleware<ctx & param>[]) => {
      url = (path + url).replace(/\/$/, "");
      const regUrl = new RegExp(url.replace(/:[^\/]*/gmsi, "(.*)"));
      const urlMatched = regUrl.exec(url) ?? [];
      middleware.forEach(fn => use(async (ctx, next) => {
        const pathname = ctx.url.pathname;
        if (!regUrl.test(pathname) || ctx.method.toLowerCase() != method) return await next();
        const pathMatched = regUrl.exec(pathname) ?? [];
        for (let i = 1; i < pathMatched.length; i++) ctx.param[urlMatched[i].substring(1)] = pathMatched[i];
        const auto = fn.length <= 1;
        await fn(<ctx & param>ctx, next);
        auto && await next();
      }));
    }
  }

  return {
    get: methodUse("get"),
    put: methodUse("put"),
    del: methodUse("del"),
    post: methodUse("post"),
    patch: methodUse("patch"),

    use, error, final,
    useList, errorList, finalList,

  }
  
}