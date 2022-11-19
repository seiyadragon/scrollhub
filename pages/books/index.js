import Head from 'next/head'
import styles from '../../styles/Books.module.css'
import { useState } from 'react'
import { FaGreaterThan, FaLessThan } from 'react-icons/fa'
import Link from 'next/link'
import { LogoImage, NavBar } from '..'

export async function getStaticProps() {
  console.log(process.env.SUPABASE_URL)
  
  return {
    props: {books: null}
  }
}

export function Book({id, title, author, img}) {
  return (
    <div>
        <Link className={styles.book_link} href={"books/" + id}>
          <img src={img}></img>
        </Link>
    </div>
  )
}

export default function Books({books}) {
  books.sort((a, b) => a.Title.localeCompare(b.Title))

  return (
    <div>
      <NavBar title="Books" />

      <div className={styles.container}>
        <LogoImage />
        <ul className={styles.book_list}>
          {books.map((book, i) => {
              return <li key={book.Id}><Book id={book.Id} title={book.Title} author={book.Author} img={book.Image}/></li>
          })}
        </ul>
      </div>
    </div>
  )
}
