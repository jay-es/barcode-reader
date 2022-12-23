import style from "./app.module.css";

export function App() {
  return (
    <>
      <header class="container">
        <h1 class={style.h1}>Barcode Reader</h1>
      </header>
      <main class="container">{/* <BarcodeReader /> */}</main>
      <footer class="container">&copy;2022 jay-es</footer>
    </>
  );
}
