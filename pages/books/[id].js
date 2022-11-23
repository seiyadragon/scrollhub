import styles from "../../styles/Book.module.css";
import { createClient } from "@supabase/supabase-js";
import { LogoImage, NavBar } from "..";

const supabase = createClient(
  "https://psffjnyfrkdpfafzdiwg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZmZqbnlmcmtkcGZhZnpkaXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4Nzc1MzAsImV4cCI6MTk4NDQ1MzUzMH0.NPyCh_ZYc4nOzKsQtwF6GK8q6c8yjpkxZty5et4LzIE"
);

export async function getServerSideProps(context) {
  var { data, error } = await supabase
    .from("Books")
    .select("*")
    .eq("id", context.query.id);

  var text = await (await fetch(data[0].formats["text/html"])).text();

  return {
    props: { 
        book: data[0],
        bookText: text,
    }
  };
}

export default function Book({ book, bookText }) {
  return (
    <main>
      <NavBar title={book.title}/>
      <section className={styles.content}>
        <LogoImage />
        <section className={styles.bookText}>
            <section dangerouslySetInnerHTML={{__html: bookText}} />
        </section>
      </section>
    </main>
  );
}
