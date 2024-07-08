import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TransferState, makeStateKey } from "@angular/platform-browser";
import { request } from "express";
import { url } from "inspector";
import { Observable, Subject, of, takeUntil, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BrowserStateInterceptor implements HttpInterceptor {
    private cache = new Map<string, Subject<void>>();

    constructor(
        private transferState: TransferState
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET') {
            const key = makeStateKey(req.url);
            const storedResponse: string = this.transferState.get(key, null)!;
            if (storedResponse) {
                // console.log(storedResponse)
                const response = new HttpResponse({ body: storedResponse, status: 200 })
                return of(response)
            }
        }
        return next.handle(req)
            .pipe(
                tap(event => {

                    if (event.type === 0) {
                        return
                    }

                    if ((event instanceof HttpResponse && (event.status === 200 || event.status === 202))) {
                        // console.log(req.url, event);
                        this.transferState.set(makeStateKey(req.url), event.body)
                    }
                })
            )

        // const newRequest = next.handle(req).pipe(

        //     // cancel the request if a same request comes in.
        //     takeUntil(cancelRequests$),

        //     // complete the subject when the request completes.
        //     tap((event) => {
        //         if (event instanceof HttpResponse) {
        //             this.cache.delete(req.url);
        //         }
        //     })
        // );

        // return newRequest;
    }
}