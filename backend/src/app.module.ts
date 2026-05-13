import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { EnginesModule } from './engines/engines.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StorageModule,
    AuthModule,
    UsersModule,
    EnginesModule,
    ManufacturersModule,
    CategoriesModule,
    ReviewsModule,
  ],
})
export class AppModule {}
