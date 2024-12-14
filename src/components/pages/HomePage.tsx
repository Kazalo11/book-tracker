import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Database, Tables } from "../../types/supabase";

type HomePageProps = {
  supabase: SupabaseClient<Database, "public", Database["public"]>;
};

type Book = Tables<"Books">;

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
