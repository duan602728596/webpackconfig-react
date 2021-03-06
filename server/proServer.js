/* 生产环境 服务器 */
const http = require('http');
const http2 = require('http2');
const fs = require('fs');
const process = require('process');
const path = require('path');
const zlib = require('zlib');
const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const compress = require('koa-compress');
const staticCache = require('koa-static-cache');
const mime = require('mime-types');

const app = new Koa();
const router = new Router();
const serverFile = path.join(__dirname, '../build');

/* 读取文件 */
function readFile(file){
  return new Promise((resolve, reject)=>{
    fs.readFile(file, (err, data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  }).catch((err)=>{
    console.error(err);
  });
}

(async function(){
  /* gzip压缩 */
  app.use(compress({
    filter(contentType){
      return true;
    },
    threshold: 2048,
    flush: zlib.constants.Z_SYNC_FLUSH
  }));

  /* 缓存 */
  app.use(convert(
    staticCache(serverFile, {
      maxAge: 60 * 60 * 24 * 365
    })
  ));

  /* router */
  app.use(router.routes())
    .use(router.allowedMethods());

  /* index路由 */
  router.get(/^\/[^._\-]*$/, async(ctx, next)=>{
    const body = await readFile(path.join(serverFile, 'index.html'));

    ctx.status = 200;
    ctx.type = 'text/html';
    ctx.body = body;

    await next();
  });

  /* 静态文件 */
  router.get(/^.*\.[a-zA-Z0-9]+$/, async(ctx, next)=>{
    const pathFile = ctx.path;
    const file = path.join(serverFile, pathFile);

    if(fs.existsSync(file)){
      ctx.status = 200;
      ctx.type = mime.lookup(file);
      ctx.body = await readFile(file);
    }else{
      ctx.status = 404;
    }

    await next();
  });

  /* http服务 */
  http.createServer(app.callback()).listen(process.env.HTTP_SERVER_PORT || 5052);

  /* https服务 */
  const key = path.join(__dirname, '../server.key');
  const crt = path.join(__dirname, '../server.crt');
  if(fs.existsSync(key) && fs.existsSync(crt)){
    http2.createSecureServer({
      allowHTTP1: true,
      key: await readFile(key),
      cert: await readFile(crt)
    }, app.callback()).listen(process.env.HTTPS_SERVER_PORT || 5053);
  }
})();