import { Component, Inject, Optional } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { REQUEST } from "@nguniversal/express-engine/tokens";

@Component({
    selector: 'app-post',
    template: `<h1>Hello Post Component`
})
export class PostComponent {

    constructor(
        private activatedRoute: ActivatedRoute,
        @Optional() @Inject(REQUEST) private req: Request,
        @Optional() @Inject('body') private body: any
    ) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            console.log("DATA: ", data)
            console.log("APP COMPONENT: ", this.req.body)
            console.log(`BODY`, this.body);
        })
    }
}