import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FirebaseService } from '../config/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private firebase: FirebaseService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request): Promise<boolean> {
    const [, token] = request.headers?.authorization?.split(' ') || [];
    if (!token) {
      throw new HttpException('Missing access token', 401);
    }
    try {
      const decodedToken = await this.firebase.admin
        .auth()
        .verifyIdToken(token);
      if (decodedToken?.role !== 'admin') {
        throw Error('Unauthorized');
      }
      // TODO: set current user on a service for global usage, if needed.
      return !!decodedToken;
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
}
