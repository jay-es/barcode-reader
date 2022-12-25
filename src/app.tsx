import { memo } from "preact/compat";
import "./app.css";
import { BarcodeReader } from "./components/BarcodeReader";
import { ErrorList } from "./components/ErrorList";

export const App = memo(() => {
  return (
    <>
      <header class="container">
        <h1 class="h1">Barcode Reader</h1>
      </header>
      <main class="container">
        <ErrorList />
        <BarcodeReader />
      </main>
      <footer class="container">&copy;2022 jay-es</footer>
    </>
  );
});
