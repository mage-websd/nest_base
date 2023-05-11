import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import * as multer from 'multer'

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const postMulterRequest = await new Promise((resolve, reject) => {
      const reqAny: any = {};
      multer().any()(request, reqAny, function(err: any) {
        if (err) reject(err);
        resolve(request);
      });
    });
    const result = (await super.canActivate(context)) as boolean;
    
    await super.logIn(request);
    return result;
  }
}
