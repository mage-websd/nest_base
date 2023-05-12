import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    return request.isAuthenticated();
  }
}

@Injectable()
export class NoAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    return !request.isAuthenticated();
  }
}