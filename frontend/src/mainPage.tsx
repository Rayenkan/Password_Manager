import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./components/ui/table";

const MainComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/passwords?userId=1")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className=" h-full w-full bg-[#101113] text-white">
      <div>
        <Table className="w-full h-full bg-[">
          <TableHeader>
            <TableRow className="[&>*]:text-orange-300">
              <TableHead>Website</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.userDt.website}</TableCell>
                <TableCell>{item.userDt.mail}</TableCell>
                <TableCell>{item.userDt.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MainComponent;
