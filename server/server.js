require("dotenv").config()
const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const path = require("path")
const db = require("./config/connection")
const routes = require("./routes")

async function startApolloServer(typeDef, resolvers) {
    const app = express()
    const PORT = process.env.PORT || 3001
    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
    })

    await gqlServer.start()
    gqlServer.applyMiddleware({ app })

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "../client/build")))
    }

    app.use(routes)

    db.once("open", () => {
        app.listen(PORT, () =>
            console.log(
                `🌍 Now listening on localhost:${PORT}\nUse GraphQL at http://localhost:${PORT}${server.graphqlPath}`
            )
        )
    })
}
