import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt.auth.guard";



async function start(){
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  const  config = new DocumentBuilder()
    .setTitle('Статьи по теме "Научно-аналитическое рассмотрение мистики"')
    .setDescription('Аннотация: Оставляя в стороне семантический анализ мистических представлений и связей, автор анализирует структурно-функциональную сторону мистики, полагая её критерием непосредственную связь субъекта с сакральными приоритетами. Опровергаются десять распространенных заблуждений относительно природы мистики: отождествление её с экстазом, с иррациональным и др.')
    .setVersion('1.8.8')
    .addTag('Vanchikova Narana')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app,document)

  await app.listen(PORT, () =>console.log('Server started on port = 5000'))

}

start()