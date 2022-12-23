import { Application, Router, send, viewEngine, oakAdapter, dejsEngine } from './deps.ts';

const app = new Application();
const PORT = 4000;
const colores = [];

// EJS
app.use(viewEngine(oakAdapter, dejsEngine, {
  viewRoot: './views'
}));

// Archivos estáticos - Para servir CSS
app.use(async (ctx, next) => {
  const filePath = ctx.request.url.pathname;
  if (!filePath.startsWith('/static')) {
    next();
    return;
  }
  await send(ctx, filePath);
});

// Router
const router = new Router();
router.get('/', async (ctx, next) => {
  await ctx.render('form.ejs', { colores });
});

router.post('/',async (ctx) => {
  const body = ctx.request.body();
  const data = await body.value;

  for (const [key, val] of data.entries()) {
    if(key === 'color'){
      colores.push(val);
      break;
    }
  }
  ctx.response.redirect('/');
})

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: PORT });