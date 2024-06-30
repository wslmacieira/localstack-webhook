import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
// The Express app is exported so that it can be used by serverless Functions.
export const server = express();
const distFolder = join(process.cwd(), 'dist/my-app/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', distFolder);
// Example Express Rest API endpoints
// server.get('/api/**', (req, res) => { });
// server.use(express.json())
// Middlewares
const bufferToJSONMiddleware = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    if (req.body instanceof Buffer) {
        req.body = req.body.toString();
        try {
            req.body = JSON.parse(req.body.toString());
        } catch (err) {
            // next(err)
            // return res.status(400).json({ error: 'Invalid JSON data' });
        }
    }
    next();
};
server.post('/api/**', bufferToJSONMiddleware, (req, res) => {
    console.log("POST", req.body)
    // server.use(express.json())
    // console.log({
    //     payload: req.body
    // })
    res.send({
        message: "hello world!",
        payload: req.body
    })
});

// Serve static files from /browser
server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
}));

// All regular routes use the Universal engine
server.get('*', (req, res) => {
    console.log("GET", req.body)
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});

export * from './src/main.server';