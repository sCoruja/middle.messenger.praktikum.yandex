import { IndexPage } from "./pages/index";
import "./index.css";
import { render } from "./utils/renderDom";


const pathname = window.location.pathname.endsWith("/")
  ? window.location.pathname
  : window.location.pathname + "/";

switch (pathname) {
  default: {
    const indexPage = new IndexPage();
    render("#app", indexPage);
    break;
  }
}