// import Image from "next/image";
// import styles from "./page.module.css";
// import GroceryList from "./components/GroceryList";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <GroceryList />
//     </main>
//   );
// }
"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import GroceryList from "./components/GroceryList";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <GroceryList />
      </QueryClientProvider>
    </main>
  );
}
