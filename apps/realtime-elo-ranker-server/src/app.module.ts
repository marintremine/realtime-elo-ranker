import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';
import { PlayerModule } from './player/player.module';
import { MatchController } from './match/match.controller';
import { MatchService } from './match/match.service';
import { MatchModule } from './match/match.module';
import { RankingController } from './ranking/ranking.controller';
import { RankingModule } from './ranking/ranking.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    EventEmitterModule.forRoot(), 
    PlayerModule, 
    MatchModule, 
    RankingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
