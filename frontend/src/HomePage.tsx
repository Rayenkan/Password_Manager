import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "./components/ui/input";
import { redirect } from "react-router-dom";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { useAuth, useFetch } from "./components/store";
import { Toaster } from "./components/ui/sonner";

const HomePage = () => {
  const {id} = useAuth()
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setFetch } = useFetch();
  const [open, setOpen] = useState(false);
  const { name } = useAuth();

  const handleNewPassword = async () => {
    try {
      const response = await fetch("http://localhost:3000/addPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          data: {
            website,
            email,
            password,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      console.log("Response from server:", res);
      setFetch();
      setOpen(false);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-[#101113] p-4 text-white w-full h-[22vh]">
      <p className="text-2xl">Main</p>
      <br />
      <div className="flex flex-row justify-between [&>*]:mr-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            className="bg-orange-500 p-2 rounded-xl"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </DialogTrigger>
          <DialogContent className="bg-[#e8e8e8]">
            <DialogHeader className=" h-fit p-10 w-full">
              <DialogTitle>Add new Password ?</DialogTitle>
              <DialogDescription className="h-fit flex flex-col  items-center ">
                <div className="flex flex-col  items-center ">
                  <div className="input flex flex-col w-fit static">
                    <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit">
                      Website Link:
                    </label>
                    <input
                      onChange={(e) => setWebsite(e.target.value)}
                      id="Website"
                      type="text"
                      placeholder="Write here..."
                      name="input"
                      className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
                    />
                  </div>

                  <div className="input flex flex-col w-fit static">
                    <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit">
                      Email:
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="Email"
                      type="text"
                      placeholder="Write here..."
                      name="input"
                      className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
                    />
                  </div>

                  <div className="input flex flex-col w-fit static">
                    <label className="text-blue-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-[#e8e8e8] w-fit">
                      Password:
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      type="text"
                      placeholder="Write here..."
                      name="input"
                      className="border-blue-500 input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
                    />
                  </div>
                  <br />
                  <Toaster />
                  <Button
                    variant="default"
                    className="cursor-pointer bg-gradient-to-r from-[#EB3349] to-[#F45C43] px-6 py-2 rounded text-white font-semibold shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-10px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] focus:shadow-[inset_-12px_-8px_40px_#46464620] transition-shadow"
                    onClick={handleNewPassword}
                  >
                    Submit
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
          />
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 text-black"
          />
        </div>
        <div className="flex flex-row justify-between">
          {name != "" ? <p>Welcome {name}</p> : null}
          <a href="/">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Img</AvatarFallback>
            </Avatar>
          </a>
        </div>
      </div>
      <br />
      <hr />
    </div>
  );
};

export default HomePage;
