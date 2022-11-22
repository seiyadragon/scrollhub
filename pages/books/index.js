import Head from 'next/head'
import styles from '../../styles/Books.module.css'
import { useState } from 'react'
import { FaCross, FaExclamationCircle, FaGreaterThan, FaLessThan } from 'react-icons/fa'
import Link from 'next/link'
import { LogoImage, NavBar } from '..'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://psffjnyfrkdpfafzdiwg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZmZqbnlmcmtkcGZhZnpkaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4Nzc1MzAsImV4cCI6MTk4NDQ1MzUzMH0.NPyCh_ZYc4nOzKsQtwF6GK8q6c8yjpkxZty5et4LzIE")

export async function getServerSideProps(context) {
  let page = context.query.page

  let {data, error} = await supabase.from("Books").select().eq("page", page)
  let {data: pageCount, error2} = await supabase.from("Books").select().eq("id", -69)

  return {
    props: {
      books: data,
      page: page,
      pageCount: pageCount[0].page
    }
  }
}

export function Book({book}) {
  let imageNull = false
  if (book.formats["image/jpeg"] == null)
    imageNull = true

  return (
    <section className={styles.bookContainer}>
        <Link className={styles.book_link} href={"books/" + book.id}>
          <section className={styles.bookImage} style={{'backgroundImage': `url(${book.formats["image/jpeg"]})`}}>
            {book.formats["image/jpeg"] == null &&
              <section className={styles.noImageBook}>
                {book.title != null && <span>{book.title}</span>}
                <br/>
                {book.authors[0] != null && <span>{book.authors[0].name}</span>}
                <br/>
                {book.translators[0] != null && <span>{book.translators[0].name}</span>}
              </section>} 
          </section>
        </Link>
    </section>
  )
}

export function PageSelector({page, pageCount}) {
  return (
    <section className={styles.pageSelector}>
      <Link href={'/books?page=1'} className={styles.pageSelectorItem}>
        <span>1</span>
      </Link>

      {page > 1 ? 
        <Link href={'/books?page=' + (page - 1)} className={styles.pageSelectorItem}>
          <span>{page - 1}</span>
        </Link>
      :
        <span className={styles.pageSelectorItem}></span>}

      <span className={styles.pageSelectorItem}>{page}</span>

      {page <= pageCount ?
        <Link href={'/books?page=' + (parseInt(page) + 1)} className={styles.pageSelectorItem}>
          <span>{(parseInt(page) + 1)}</span>
        </Link>
        :
          <span className={styles.pageSelectorItem}></span>}

        <Link href={'/books?page=' + pageCount} className={styles.pageSelectorItem}>
          <span>{pageCount}</span>
        </Link>
      
    </section>
  )
}

export default function Books({books, page, pageCount}) {
  return (
    <section>
      <NavBar title="Books" />
      <section className={styles.container}>
        <LogoImage />
        <PageSelector page={page} pageCount={pageCount}/>
        <ul className={styles.book_list}>
          {books.map((book, i) => {
              return <li key={book.id} className={styles.book}><Book book={book}/></li>
          })}
        </ul>
      </section>
    </section>
  )
}
