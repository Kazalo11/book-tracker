import { createClient } from "@supabase/supabase-js";
import { Book } from "../types/books";
import { Database } from "../types/supabase";


type BookItemResponse = {
	numFound: number;
	docs: {
	  author_name: string[];
	  title: string;
	  isbn: string[];
	}[];
      };

async function imageExists(isbn: string): Promise<string> {
	try {
	  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=False`;
	  const response = await fetch(url);
	  if (response.status == 404) {
	    console.log(`URL ${url} returned 404`);
	    return "";
	  } else {
	    console.log(`URL ${url} returned status: ${response.status}`);
	    return url;
	  }
	} catch (error) {
	  console.error(`Error fetching URL`, error);
	  return "";
	}
      }
export async function mapIsbnToBook(isbn: string): Promise<Book | undefined> {
	const supabase = createClient<Database>(
		import.meta.env.VITE_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_ANON_KEY
	      );
	const url = `https://openlibrary.org/search.json?q=isbn%3D${isbn}`;

      const response: BookItemResponse = await fetch(url).then((response) =>
        response.json()
      );
      if (!response.numFound) {
        return;
      }

      let bookUrl: string = "";
      for (const isbn of response.docs[0].isbn) {
        const url = await imageExists(isbn);
        if (url.length) {
          bookUrl = url;
	  break;
        }
      }
      const {data} = await supabase.auth.getUser()

      const userId = data.user?.id
      
      return {
	author: response.docs[0].author_name[0],
	title: response.docs[0].title,
	created_at: new Date().toISOString(),
	isbns: response.docs[0].isbn,
	hasRead: false,
	imageLink: bookUrl,
	isbn,
	userId: userId ?? null

      }


}