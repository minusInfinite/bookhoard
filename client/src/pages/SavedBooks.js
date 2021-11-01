import { useMutation, useQuery } from "@apollo/client"
import React from "react"
import { Container, Row, Card, Button } from "react-bootstrap"
import Auth from "../utils/auth"
import { removeBookId } from "../utils/localStorage"
import { REMOVE_BOOK } from "../utils/mutations"
import { GET_ME } from "../utils/queries"

const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME)
    // eslint-disable-next-line no-unused-vars
    const [removeBook, { error, book }] = useMutation(REMOVE_BOOK)
    // use this to determine if `useEffect()` hook needs to run again
    let user = data?.me || {}

    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null

        if (!token) {
            return false
        }

        try {
            const { data } = await removeBook({ variables: { bookId } })

            user = data
            // upon success, remove book's id from localStorage
            removeBookId(bookId)
        } catch (err) {
            console.error(err)
        }
    }

    // if data isn't here yet, say so
    if (loading) {
        return <h2>LOADING...</h2>
    }

    return (
        <>
            <Container fluid className="py-5 text-light bg-dark">
                <Container>
                    <h1>Viewing {user.username}'s saved books!</h1>
                </Container>
            </Container>
            <Container>
                <h2>
                    {user.savedBooks.length
                        ? `Viewing ${user.savedBooks.length} saved ${
                              user.savedBooks.length === 1 ? "book" : "books"
                          }:`
                        : "You have no saved books!"}
                </h2>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {user.savedBooks.map((book) => {
                        return (
                            <Card key={book.bookId} border="dark">
                                {book.image ? (
                                    <Card.Img
                                        src={book.image}
                                        alt={`The cover for ${book.title}`}
                                        variant="top"
                                    />
                                ) : null}
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                    <p className="small">
                                        Authors: {book.authors}
                                    </p>
                                    <Card.Text>{book.description}</Card.Text>
                                    <Button
                                        className="btn-block btn-danger"
                                        onClick={() =>
                                            handleDeleteBook(book.bookId)
                                        }>
                                        Delete this Book!
                                    </Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}

export default SavedBooks
