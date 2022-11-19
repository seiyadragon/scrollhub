import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv/config'


async function run() {
    const supabase = createClient(dotenv.process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    let gutendex = await fetch("https://gutendex.com/books/")
    
    do {
        let currentPage = gutendex.results

        currentPage.forEach(() => {

        }) 
    }
    while (gutendex.next != null) {

    }
}

run()