import express from 'express'
import morgan from 'morgan'
import webhooks from 'node-webhooks'

const registerHooks = () => {
    return new webhooks({
        db: {
            'callback_hook': ['http://localhost:4566/restapis/tj2logwf6j/x3ib40wfxp/_user_request_/ssr/api/webhook']
        }
    });
}

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.post("/payments", async (req, res) => {
    const payment = req.body
    if (payment) {
        const hooks = registerHooks();
        hooks.trigger('callback_hook', { msg: "new payment created", data: req.body });
    }
    return res.send({ payment })
})

app.listen(9000, () => {
    console.log("Node-Webhook has been stated at: http://localhost:9000");
})
