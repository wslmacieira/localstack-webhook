import { isPlatformServer } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core";
import { TransferState, makeStateKey } from "@angular/platform-browser";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { REQUEST } from "@nguniversal/express-engine/tokens";
import { of, tap } from "rxjs";
import { ProductService } from "../services/product.service";

export const PostResolver: any = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const platformId = inject(PLATFORM_ID)
    const transferState = inject(TransferState)
    const postService = inject(ProductService)
    const request = inject(REQUEST)

    const alias = route.paramMap.get('alias');
    const POST_KEY = makeStateKey<any>('post-' + alias)
    let post: any | null = null
    let fetchOptions = undefined

    if (isPlatformServer(platformId)) {
        postService.list().subscribe((p) => {
            console.log("RESOLVER :", request.body)
        })
    }

    if (transferState.hasKey(POST_KEY)) {
        post = transferState.get(POST_KEY, null)
        transferState.remove(POST_KEY)
        return of(post)
    }

    return postService.list().pipe(
        tap((item) => {
            if (isPlatformServer(platformId)) {
                // transferState.set(POST_KEY, item)
                transferState.set(POST_KEY, request.body)
            }
            return request.body
        })
    )
}