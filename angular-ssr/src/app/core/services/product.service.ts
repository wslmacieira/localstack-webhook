import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'any' })
export class ProductService {
    constructor(private authService: AuthService) { }

    public list() {
        const isAuthenticated = this.authService.login()
        return of([
            {
                id: 1,
                name: 'Macbook',
                price: 8.999,
                isAuthenticated
            }
        ])
    }
}