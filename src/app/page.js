import Image from "next/image";
import styles from "./page.module.css";
import GroceryList from "./components/GroceryList";

export default function Home() {
  return (
    <main className={styles.main}>
      <GroceryList />
    </main>
  );
}
