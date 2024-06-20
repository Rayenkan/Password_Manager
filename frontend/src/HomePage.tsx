import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import useStore from "./components/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MainPage from "./mainPage";

const Account = () => {
  const { choice } = useStore();
  console.log(choice);
  return (
    <div className="flex flex-col bg-[#101113] p-4 text-white w-full h-[22vh]">
      <p className="text-2xl">Main</p>
      <br />
      <div className="flex flex-row justify-between [&>*]:mr-5">
        <Button variant="default" className="bg-orange-500">
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
        <FontAwesomeIcon
          icon={faSearch}
          className="relative left-14 top-1/2 transform -translate-y-1/2 text-black"
        />
        <Input type="text" placeholder="Search" className="pl-10 text-black" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Img</AvatarFallback>
        </Avatar>
      </div>
      <br />
      <hr />
      <div>{choice == "main" ? <MainPage /> : null}</div>
    </div>
  );
};
export default Account;
