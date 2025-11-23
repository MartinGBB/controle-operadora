import { Module } from '@nestjs/common';
import { memoryDbProvider } from '../config/memory-db.provider';
import { ICacheRepository } from '../../domain/repositories/ICacheRepository.repository';
import { CacheMemoryRepository } from '../database/repositories/cache-memory.repository';

@Module({
  providers: [
    memoryDbProvider,
    {
      provide: ICacheRepository,
      useClass: CacheMemoryRepository,
    },
  ],
  exports: [ICacheRepository],
})
export class DatabaseModule {}