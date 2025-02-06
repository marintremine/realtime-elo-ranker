import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private playersRepository;
    private eventEmitter;
    constructor(playersRepository: Repository<Player>, eventEmitter: EventEmitter2);
    findAll(): Promise<Player[]>;
    findOne(playerId: number): Promise<Player | null>;
    findOneById(id: string): Promise<Player | null>;
    remove(playerId: number): Promise<void>;
    addPlayer(id: string, rank: number): Promise<Player>;
    updatePlayer(playerId: number, rank: number): Promise<Player>;
    getPlayers(): Promise<Player[]>;
    getEmitter(): EventEmitter2;
    emitRankingUpdate(player: Player): void;
}
