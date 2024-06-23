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
import { useAuth, useFetch } from "./components/store";

const MainComponent = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const { doFetch } = useFetch(); // Custom hook for making fetch requests
  const { id } = useAuth(); // Custom hook to get authenticated user's ID

  useEffect(() => {
    // Fetch passwords data when doFetch changes or component mounts
    fetch(`http://localhost:3000/passwords?userId=${id}`)
      .then((response) => response.json()) // Parse response JSON
      .then((data) => setData(data)) // Set fetched data into state
      .catch((error) => console.error("Error fetching data:", error)); // Handle fetch errors
  }, [doFetch]); // Dependency array ensures effect runs on mount and when doFetch changes
  console.log(data); // Log fetched data to console for debugging

  return (
    <div className="flex h-[100vh] w-full bg-[#101113] text-white">
      <div className="max-h-full w-full bg-[#101113] text-white overflow-scroll">
        <Table className="w-full h-full bg-[#2c2f33] mt-2 mb-2 p-2 rounded-xl overflow-scroll">
          {/* Table header */}
          <TableHeader>
            <TableRow className="[&>*]:text-orange-300">
              <TableHead>Website</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
            </TableRow>
          </TableHeader>
          {/* Table body */}
          <TableBody>
            {/* Map over fetched data to display each password entry */}
            {data.map((user, userIndex) =>
              user.userDt.map((item, index) => (
                <TableRow key={`${userIndex}-${index}`}>
                  <TableCell>
                    {/* Link to website with FontAwesome icon */}
                    <a href={`${item.website}`}>
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
