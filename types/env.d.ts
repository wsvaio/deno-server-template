type obj = {[k: string]: any};

type ctx = {
  // 请求对象
  request: Request;
  // 请求体
  body: any;
  // query参数
  query: obj;
  // 请求url
  url: URL;
  // 请求方法
  method: string;

  // 请求扩展名（如果有的话）
  ext: string;

  // 返回headers
  headers: Headers;
  // 返回状态
  status: number;
  // 返回体
  data: any;

  
  
} & obj & {

  user: obj;
  auth: () => Promise<any>;
};