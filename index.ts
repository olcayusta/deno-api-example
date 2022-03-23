import {Application, Router} from "https://deno.land/x/oak/mod.ts";
import {Client} from "https://deno.land/x/postgres@v0.15.0/mod.ts";

const client = new Client({
    user: "postgres",
    password: "123456",
    database: "qa_app",
    hostname: "localhost",
    port: 5432,
});
await client.connect();

{
    const result = await client.queryObject(`SELECT * FROM "user" LIMIT 1`);
    console.log(result.rows); // [{id: 1, name: 'Carlos'}, {id: 2, name: 'Johnru'}, ...]
}

await client.end();

const router = new Router();

router
    .get("/", (ctx) => {
        ctx.response.body = "<h1>Merhaba dünya!</h1>";
    }).get("/book", (ctx) => {
    ctx.response.body = "Book";
});

const app = new Application();
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({port: 80});
