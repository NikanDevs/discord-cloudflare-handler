# Discord Cloudflare handler with workers

Discord bot handler with cloudflare workers (also known as discord-http-endpoint-applications)

## Resources

- [Discord Interactions API](https://discord.com/developers/docs/interactions/receiving-and-responding)
- [Cloudflare Workers](https://workers.cloudflare.com/)

## 1. Making a Discord application

You have to make a Discord application in [Discord's developer portal](https://discord.com/developers/applications)
 - Application scopes: `bot` and `application.commands`

## 2. Create a cloudflare worker

- Visit the [Cloudflare dashboard](https://dash.cloudflare.com/)
- Click on the `Workers` tab, and create a new service using the same name as your Discord bot
- Make sure to [install the Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler/install-update/) and set it up.

## 3. Configuring wrangler.toml

Replace values for `name` with your worker name and `account_id` with your cloudflare's account ID

## 4. Saving your project environment variables

```
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID
$ wrangler secret put DISCORD_TEST_GUILD_ID
```
- After running each command, the wrangler asks you for the value of the variable, type the value in there
- *Note: You have to use `npx wrangler secret put ...` if you are using macOS*

## 5. Register application commands

You need to make a `.env` as shown in `.env.example` and replace all of your environment variables with *value*s

```
$ npm run register
```

## 6. Set the interaction endpoint URL for your application

Go to [Discord's developer portal](https://discord.com/developers/applications), and select your application. 
1. Select the `General Information` tab
2. Put your worker route (https://WORKER_NAME.ACCOUNT_SUBDOMAIN.workers.dev) in the `interaction endpoint URL` section

## 7. Deploy and publish

```
$ npm run deploy
```

> This README is an extended version of [**discord/cloudflare-sample-app/README.md**](https://github.com/discord/cloudflare-sample-app/blob/main/README.md)