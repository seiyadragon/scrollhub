import styles from "../styles/Search.module.css";
import { createClient } from "@supabase/supabase-js";
import { LogoImage, NavBar } from ".";
import { useState } from "react";

const supabase = createClient(
	"https://psffjnyfrkdpfafzdiwg.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZmZqbnlmcmtkcGZhZnpkaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4Nzc1MzAsImV4cCI6MTk4NDQ1MzUzMH0.NPyCh_ZYc4nOzKsQtwF6GK8q6c8yjpkxZty5et4LzIE"
);

export async function getServerSideProps(context) {
    let pageValue = context.query.page == null ? null : context.query.page

    return {
        props: {
            page: pageValue
        }
    }
}

export default function Search({page}) {
    var [searchValue, setSearchValue] = useState()

    function onSearchChange(event) {
        setSearchValue(event.target.value)
    }

    function onSearchKeyDown(event) {
        if (event.key === 'Enter') {
            console.log(searchValue)
        }
    }

    return (
        <main>
            <NavBar title="Search"/>
            <section className={styles.content}>
                <LogoImage />
                {page == null &&
                    <section className={styles.searchBarWrapper}>
                        <input 
                            className={styles.searchBar} 
                            placeholder="Search for books here"
                            value={searchValue}
                            onChange={onSearchChange}
                            onKeyDown={onSearchKeyDown}
                        />
                    </section>
                }
            </section>
        </main>
    )
}