import style from "./app.module.css";
import { BarcodeReader } from "./components/BarcodeReader";
import { ErrorList } from "./components/ErrorList";

export function App() {
  return (
    <>
      <header class="container">
        <h1 class={style.h1}>Barcode Reader</h1>
      </header>
      <main class="container">
        <ErrorList />
        <BarcodeReader />
      </main>
      <footer class="container">&copy;2022 jay-es</footer>
    </>
  );
}
