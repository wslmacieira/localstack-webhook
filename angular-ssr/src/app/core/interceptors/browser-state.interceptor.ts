import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferState, makeStateKey } from "@angular/platform-browser";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class BrowserStateInterceptor implements HttpInterceptor {

    constructor(
        private transferState: TransferState
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET') {
            const key = makeStateKey(req.url);
            const storedResponse: string = this.transferState.get(key, null)!;
            if (storedResponse) {
                const response = new HttpResponse({ body: storedResponse, status: 200 })
                return of(response)
            }
        }

        return next.handle(req);
    }
}