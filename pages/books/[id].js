import { useRouter } from "next/router";
import { ReactReader, ReactReaderStyle } from "react-reader";
import React, { useState } from "react"
import Head from "next/head";
import styles from "../../styles/Book.module.css"
import {FaHome} from 'react-icons/fa'

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
            color: 'orange'
        }, readerArea: {
            ...ReactReaderStyle.readerArea,
            backgroundColor: 'rgb(66, 66, 66)'
        }, tocArea: {
            ...ReactReaderStyle.tocArea,
            background: 'rgb(66, 66, 66)'
        }, tocButtonExpanded: {
            ...ReactReaderStyle.tocButtonExpanded,
            background: 'rgb(33, 33, 33)'
        }, titleArea: {
            ...ReactReaderStyle.titleArea,
            color: 'antiquewhite'
        }
    }

    var book_url = "/books/" + resultBook.Text

    return (
        <div>
            <Head>
                <title>{resultBook.Title}</title>
            </Head>
            <div style={{ height: "100vh" }}>
                <ReactReader
                    location={location}
                    locationChanged={locationChanged}
                    showToc={false}
                    title={resultBook.Title}
                    styles={reactReaderStyle}
                    url={book_url}
                    getRendition={(rendition) => {
                        rendition.themes.register('custom', {
                            "body": {
                                "background-color": "rgb(33, 33, 33)",
                                "color": "antiquewhite"
                            },
                            "a": {
                                "color": "orange"
                            },
                            "link": {
                                "color": "orange"
                            },
                        })
                        rendition.themes.select('custom')
                    }}
                />
            </div>
            <a className={styles.back_button} href='/'><FaHome /></a>
        </div>
    )
}