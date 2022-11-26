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
    let searchValue = context.query.search == null ? "" : context.query.search
    
    if (searchValue != "") {
        var data = []
        let shouldLoadMoreBooks = true
        let bookRangeCounter = 0
        while (shouldLoadMoreBooks) {
            let {data: tmpData, err} = await supabase.from("Books").select().range(bookRangeCounter * 1000, ((bookRangeCounter + 1) * 1000) - 1)

            for (let value of tmpData) {
                let found = false

                for (let value2 of data) {
                    if (value.id === value2.id)
                        found = true
                }

                if (found)
                    continue

                else data.push(value)
            }

            if (tmpData.length < 1000)
                shouldLoadMoreBooks = false

            bookRangeCounter++
        }
    }

    let matchedBooks = []
    if (searchValue != "") {
        for (let value of data) {
            let addToList = false

            if (value.title != null && value.title.toLowerCase().includes(searchValue.toLowerCase())) 
                addToList = true

            for (let author in value.authors)
                if (author.name != null && author.name.toLowerCase().includes(searchValue.toLowerCase()))
                    addToList = true

            for (let alreadyAdded in matchedBooks) 
                if (parseInt(alreadyAdded.id) == parseInt(value.id)) 
                    addToList = false

            if (addToList) 
                matchedBooks.push(value)
        }

        console.log(matchedBooks.length)

        matchedBooks = Array.from(new Set(matchedBooks))
        console.log(matchedBooks.length)
    }
        
    return {
        props: {
            search: searchValue,
            books: matchedBooks
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
        setSearchValue("")
        router.push("/search?page=1&search=" + searchValue)
    }

    function onSearchKeyDown(event) {
        if (event.key === 'Enter') {
            setSearchValue("")
            router.push("/search?search=" + searchValue)
        }
    }

    console.log(books)

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
                    {books.length == 0 && search != "" &&
                        <span className={styles.notFound}>Search can't be found</span>
                    }
                </section>
                {search != "" && search.length > 0 &&
                    <BookList books={books}/>
                }
            </section>
        </main>
    )
}