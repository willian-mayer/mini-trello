import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ⚠️ solo para desarrollo (crea tablas automáticamente)
    }),
    BoardsModule,
    ListsModule,
  ],
})
export class AppModule {}
