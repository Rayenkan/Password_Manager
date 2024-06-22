import MainPage from "../mainPage";
import { useStore } from "./store";

const Pages = () => {
  const { choice } = useStore();
  console.log(choice);
  return <div>{choice === "main" ? <MainPage /> : null}</div>;
};
export default Pages;