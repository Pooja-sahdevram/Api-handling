import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(response.data);
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log(e);
          return;
        }
        setError(true);
        console.log(e);
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [search]);
  if (error) {
    return <h1>Something went wrong</h1>;
  }
  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
  return (
    <>
      {" "}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <h1>pooja</h1>
    </>
  );
}

export default App;
