import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Book } from "../../types/books";
import { Database } from "../../types/supabase";

type HomePageProps = {
  supabase: SupabaseClient<Database, "public", Database["public"]>;
};

export default function HomePage({ supabase }: HomePageProps) {
  const [books, setBooks] = useState<Book[] | null>(null);
  useEffect(() => {
    const getBookData = async () => {
      const { data, error } = await supabase.from("Books").select();
      if (error != null) {
        console.error(error);
      }
      setBooks(data);
    };
    getBookData();
  }, [supabase]);

  return <></>;
}
