import { createClient } from '@supabase/supabase-js'
import fetch from 'node-fetch'
const supabase = createClient("https://psffjnyfrkdpfafzdiwg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZmZqbnlmcmtkcGZhZnpkaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4Nzc1MzAsImV4cCI6MTk4NDQ1MzUzMH0.NPyCh_ZYc4nOzKsQtwF6GK8q6c8yjpkxZty5et4LzIE")

async function run() {
    let gutendex = await (await fetch("https://gutendex.com/books/")).json()
    let pageCounter = 0
    
    while (gutendex.next != null) {
        pageCounter++
        console.log("page" + pageCounter)
        addPage(gutendex, pageCounter)
        gutendex = await (await fetch(gutendex.next)).json()
    }

    pageCounter++
    console.log("page" + pageCounter)
    addPage(gutendex, pageCounter)

    await supabase.from("Books").insert({
        id: -69,
        page: pageCounter
    })

}

function addPage(gutendex, page) {
    gutendex.results.map(async (book) => {
        let myBook = {
            id: book.id,
            title: book.title,
            authors: book.authors,
            translators: book.translators,
            subjects: book.subjects,
            bookshelves: book.bookshelves,
            languages: book.languages,
            copyright: book.copyright,
            formats: book.formats,
            page: page,
            mediaType: book.media_type
        }
        await supabase.from("Books").insert(myBook)

        console.log(myBook)
    })
}

run()