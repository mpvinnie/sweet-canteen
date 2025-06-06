import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT
  })
  .then(() => {
    console.log('👨🏻‍🍳 Http Server Running!\n\n')
    console.log('📝 Rotas disponíveis:')
    console.log(app.printRoutes())
  })
