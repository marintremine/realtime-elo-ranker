import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private playersRepository: Repository<Player>,
        private eventEmitter: EventEmitter2
    ) {}

    findAll(): Promise<Player[]> {
        return this.playersRepository.find();
    }

    findOne(playerId: number): Promise<Player | null> {
        return this.playersRepository.findOneBy({ playerId });
    }

    findOneById(id: string): Promise<Player | null> {
        return this.playersRepository.findOneBy({ id });
    }

    async remove(playerId: number): Promise<void> {
        await this.playersRepository.delete(playerId);
    }

    async addPlayer(id: string, rank: number): Promise<Player> {
        console.log(id);
        console.log(rank);
        const player = this.playersRepository.create({ id, rank });
        await this.playersRepository.save(player);
        this.emitRankingUpdate(player);
        return player;
    }

    async updatePlayer(playerId: number, rank: number): Promise<Player> {
        const player = await this.findOne(playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        player.rank = rank;
        await this.playersRepository.save(player);
        this.emitRankingUpdate(player);
        return player;
    }
        
    async getPlayers(): Promise<Player[]> {
        return this.playersRepository.find();
    }

    getEmitter() {
        return this.eventEmitter;
    }

    emitRankingUpdate(player: Player) {
        this.eventEmitter.emit('ranking.update', player);
    }
}