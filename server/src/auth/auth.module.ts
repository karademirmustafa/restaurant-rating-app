import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    JwtModule.register({
      global: true,
      secret: config().jwt_secret_key,
      signOptions: { expiresIn: config().jwt_expires_in }
    })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
