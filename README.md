# realtime-with-QBO

This is a work in progress.

The idea is to build a demonstration of real-time integration with the [QuickBooks Online API](https://developer.intuit.com/app/developer/homepage). I imagine it as a very small subset of what I do in my work at [Beanworks](https://www.beanworks.com/) where all edits to the accounting data propagate in real-time.

So far it just allows a user to sign in to QuickBooks Online using OAuth 2. But that's a little bit interesting in it's own right, because it's done using `React`, `React Router`, `GraphQL`, `Apollo Client` with `Hooks` and `GraphQL Yoga` on the back-end. The QuickBooks developer portal provides excellent documentation and examples on how to get started. But it's all a bit old school. This provides an example of how it might look in a modern application!

Next up, I'm going to start fetching some actual data. Going to use Bills because that's what I know.

# installation

You'll need to sign up for a [QuickBooks Developer account](https://developer.intuit.com/app/developer/qbo/docs/get-started).

```bash
git clone git@github.com:efredine/realtime-with-QBO.git
cd realtime-with-QBO
npm install
cp env.example .env
```

Edit .env to change the JWT secret and enter your client id and client secret.

```env
APP_SECRET="jwtsecret123"

#OAuth2 App Configuration
OAUTH_CLIENT_ID="Q05Rq5al8tYdc56TlCyawlFbw0ngry7XRBwcSqEBGGKJ75TQVc"
OAUTH_CLIENT_SECRET="YEhUHAzm0N2ZbNmMPpg9XCq5UQAvmLS3N22RLLPi"
OAUTH_ENVIRONMENT="sandbox"
OAUTH_REDIRECT_URI="http://localhost:3000/oauth2redirect"
```

On the QBO side, you'll need to enter the Oauth Redirect URL as described in the [Quickbooks documentation on authentication and authorization](https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization#code-samples-and-sdks).

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` and connect to your QuickBooks Online sandbox.

_Name is a not meaningful in any way nod to Real-time With Bill Maher._
