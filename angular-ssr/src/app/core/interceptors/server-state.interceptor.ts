import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferState, makeStateKey } from "@angular/platform-browser";
import { BehaviorSubject, Observable, tap } from "rxjs";

export let dataSubject: BehaviorSubject<any[]> = new BehaviorSubject([]) as any

@Injectable()
export class ServerStateInterceptor implements HttpInterceptor {

    constructor(
        private readonly transferState: TransferState
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(event => {
                // console.log(req)
                if ((event instanceof HttpResponse && (event.status === 200 || event.status === 202))) {
                    // console.log(event)
                    // console.log(req.url)
                    this.transferState.set(makeStateKey(req.url), event.body)
                    dataSubject.next(event.body)
                }
            })
        )
    }
}