/*
 * @Descripttion: 
 * @version: 
 * @Author: 王远昭
 * @Date: 2023-02-25 12:17:23
 * @LastEditors: 王远昭
 * @LastEditTime: 2023-02-28 13:41:56
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { logger } from './common/middleware/logger.middleware';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { join } from 'path';

import * as fs from 'fs';

async function bootstrap() {
  // 小伙伴们，这里读取的https的证书位置，一定一定要是绝对路劲噢！！！
  const httpsOptions = {
    key: fs.readFileSync(
      join(__dirname, '../secrets/ssl.key'),
    ),
    cert: fs.readFileSync(
      join(__dirname, '../secrets/ssl.pem'),
    ),
  };
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    httpsOptions  //开启https访问
  });

  // 允许跨域
  app.enableCors({ 
    credentials: true,
    origin: true 
  });
  
  // 全局中间件
  app.use(logger);

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 配置全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 配置静态资源
  app.useStaticAssets(join(__dirname, '../public', '/'), {
    prefix: '/', 
    setHeaders: res => {
      res.set('Cache-Control', 'max-age=2592000')
    }
  });


  
  await app.listen(3000);
}
bootstrap();
