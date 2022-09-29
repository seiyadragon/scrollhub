import { useRouter } from "next/router";
import { ReactReader, ReactReaderStyle } from "react-reader";
import React, { useState } from "react"

export async function getStaticPaths() {
    var res = await import("../../public/database.json")
    var data = res.default
    var ids = []

    data.map((book, i) => {
        ids.push({params: { id: book.Id } })
    })

    return {
        paths: ids,
        fallback: false
    }
}

export async function getStaticProps() {
    var res = await import("../../public/database.json")
    var data = res.default
    
    return {
        props: {books: data}
    }
}

export default function Book({books}) {
    var router = useRouter()
    var {id} = router.query
    var resultBook

    books.map((book, i) => {
        if (book.Id == id) 
            resultBook = book
    })

    const [location, setLocation] = useState(null)
    const locationChanged = (epubcifi) => {
        setLocation(epubcifi)
    }
    const reactReaderStyle = {
        ...ReactReaderStyle, arrow: {
            ...ReactReaderStyle.arrow,
            color: 'red',
        },
    }

    var book_url = "/books/" + resultBook.Text

    return (
        <div>
            <div style={{ height: "100vh" }}>
                <ReactReader
                    location={location}
                    locationChanged={locationChanged}
                    showToc={true}
                    title={resultBook.Title}
                    styles={reactReaderStyle}
                    url={book_url}
                />
            </div>
        </div>
    )
}