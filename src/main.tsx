import { render } from "preact";
import { App } from "./app";
import "@picocss/pico/css/pico.min.css";

render(<App />, document.getElementById("app") as HTMLElement);
