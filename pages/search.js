import styles from "../styles/Search.module.css";
import { createClient } from "@supabase/supabase-js";
import { LogoImage, NavBar } from ".";
import { useState } from "react";
import { BookList, PageSelector } from "./books";
import { useRouter } from "next/router";

const supabase = createClient(
	"https://psffjnyfrkdpfafzdiwg.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZmZqbnlmcmtkcGZhZnpkaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4Nzc1MzAsImV4cCI6MTk4NDQ1MzUzMH0.NPyCh_ZYc4nOzKsQtwF6GK8q6c8yjpkxZty5et4LzIE"
);

export async function getServerSideProps(context) {
    let searchValue = context.query.search == null ? null : context.query.search
    let {data, error} = supabase.from("Books").select("*")

    let matchedBooks = []
    data.map((value) => {
        if (value.title.includes(search)) {
            sortedBooks.push(value)
        }
        for (author in value.authors) {
            if (author.includes(search)) {
                sortedBooks.push(value)
                break
            }
        }
    })

    console.log(matchedBooks)

    return {
        props: {
            search: searchValue,
            books: matchedBooks,
        }
    }
}

export default function Search({search, books}) {
    let [searchValue, setSearchValue] = useState("")
    let router = useRouter()

    function onSearchChange(event) {
        setSearchValue(event.target.value)
    }

    function onSearchSubmit(event) {
        console.log("Yuh")
        router.push("/search?page=1&search=" + searchValue)
    }

    function onSearchKeyDown(event) {
        if (event.key === 'Enter') {
            router.push("/search?search=" + searchValue)
        }
    }

    return (
        <main>
            <NavBar title="Search"/>
            <section className={styles.content}>
                <LogoImage />
                <section className={styles.searchBarWrapper}>
                    <input 
                        className={styles.searchBar} 
                        placeholder="Search for books here"
                        value={searchValue}
                        onChange={onSearchChange}
                        onSubmit={onSearchSubmit}
                        onKeyDown={onSearchKeyDown}
                    />
                </section>
                {search != null && books != null && books.legth > 0 &&
                    <BookList books={books} />
                }
                {search != null && (books == null || books.legth <= 0) && 
                    <span className={styles.notFound}>Search can't be found</span>
                }
            </section>
        </main>
    )
}