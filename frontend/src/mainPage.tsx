import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./components/ui/table";
import { useFetch } from "./components/store";

const MainComponent = () => {
  const [data, setData] = useState([]);
  const { doFetch }=useFetch()

  useEffect(() => {
    fetch("http://localhost:3000/passwords?userId=1")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [doFetch]);

  return (
    <div className="h-full w-full bg-[#101113] text-white overflow-scroll">
      <div>
        <Table className="w-full h-full bg-[#2c2f33] mt-2">
          <TableHeader>
            <TableRow className="[&>*]:text-orange-300">
              <TableHead>Website</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, userIndex) =>
              user.userDt.map((item, index) => (
                <TableRow key={`${userIndex}-${index}`}>
                  <TableCell>
                    <a href={`${item.website}`}>
                      {" "}
                      <FontAwesomeIcon icon={faGlobe} className="mx-2" />
                      {item.website}
                    </a>
                  </TableCell>
                  <TableCell>{item.mail}</TableCell>
                  <TableCell>{item.password}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MainComponent;
