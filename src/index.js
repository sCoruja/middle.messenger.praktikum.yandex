import { IndexPage } from "./pages/index/index";
import "./index.css";
import { render } from "./utils/renderDOM";
import { registerComponent } from "./utils/registerComponent";
import { Button } from "./components/Button";
import { Input } from "./components/Input";

registerComponent("Button", Button);
registerComponent("Input", Input);
const indexPage = new IndexPage();
render("#app", indexPage);

// const pathname = window.location.pathname.endsWith("/")
//   ? window.location.pathname
//   : window.location.pathname + "/";
// switch (pathname) {
//   case "/": {
//     const indexPage = new IndexPage();
//     render("#app", indexPage);
//     break;
//   }
//   default: {
//     // const errorPage = new IndexPage();
//     // render("#app", errorPage);
//     break;
//   }
// }
