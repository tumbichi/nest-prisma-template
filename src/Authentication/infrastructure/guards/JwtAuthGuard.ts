import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (!user) {
      const error = err || info;
      switch (error?.name) {
        case 'JsonWebTokenError':
        case 'TokenExpiredError':
        case 'TokenNotValidException': {
          throw new UnauthorizedException(error.message);
        }
        default: {
          const errorMessage =
            typeof error.message === 'string' ? error.message : null;
          throw new UnauthorizedException(errorMessage ?? error);
        }
      }
    }
    return user;
  }
}
