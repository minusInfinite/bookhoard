require("dotenv").config()
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core")
const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const morgan = require("morgan")
const path = require("path")
const db = require("./config/connection")
//const routes = require("./routes")
const { typeDefs, resolvers } = require("./schemas/")
const { authMiddleware } = require("./utils/auth")

async function startApolloServer(typeDefs, resolvers) {
    const app = express()
    const PORT = process.env.PORT || 3001
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => {
            return authMiddleware({ req: req })
        },
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
                settings: { "request.credentials": "include" },
            }),
        ],
    })

    await gqlServer.start()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    gqlServer.applyMiddleware({ app })

    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")))
    }

    //app.use(routes)

    db.once("open", () => {
        app.listen(PORT, () =>
            console.log(
                `🌍 Now listening on localhost:${PORT}\nUse GraphQL at http://localhost:${PORT}${gqlServer.graphqlPath}`
            )
        )
    })
}

startApolloServer(typeDefs, resolvers).catch((err) => console.error(err))
