import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { ExampleWsModule } from './example-ws/example-ws.module';

@Module({
  imports: [ExampleModule, ExampleWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
