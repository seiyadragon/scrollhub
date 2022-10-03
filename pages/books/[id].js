import { useRouter } from "next/router";
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

    return (
        <div className={styles.container}>
            <Head>
                <title>{resultBook.Title}</title>
            </Head>
            <div className={styles.frame_container}>
                <iframe className={styles.book} scrolling="yes" src={resultBook.Text}></iframe>
            </div>
            <a className={styles.back_button} href='/'><FaHome /></a>
        </div>
    )
}