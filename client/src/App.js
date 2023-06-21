import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Url from "./components/Url";

function App() {
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);
  const [click, setClick] = useState(0);
  let [data, setData] = useState([]);
  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("inside handle submit");
      let resp = await axios.post("http://localhost:3001/createUrl", { url });
      console.log(resp);
      setUrlData(resp.data);
      setClick((prev) => prev + 1);
    } catch (err) {
      console.log("error in sending");
      setClick((prev) => prev + 1);
    }
  };
  let fetchData = async () => {
    try {
      console.log("inside fetch data");
      let resp = await axios.get("http://localhost:3001/getData");
      setUrlData(resp.data);
      setData(resp.data);
    } catch (err) {
      console.log("error in fetching data");
    }
  };
  let handleClick = async (event) => {
    console.log(event.target.innerText);

    try {
      let url_ = "http://" + event.target.innerText;
      console.log("url_ ", url_);
      setClick((prev) => prev + 1);
      window.open(url_);

      //let resp = await axios.get(url_);
    } catch (err) {
      console.log("unable to redirect");
    }
  };
  let handleSort = (parameter, sortType) => {
    console.log(parameter, sortType);
    if (parameter === "clicks" && sortType === "asc") {
      data.sort((a, b) => a.clicks - b.clicks);
      setData(data);
    }
    if (parameter === "clicks" && sortType === "dsc") {
      data.sort((a, b) => b.clicks - a.clicks);
      setData(data);
    }
    if (parameter === "date_added" && sortType === "asc") {
      data.sort((a, b) => a.date_added.localeCompare(b.date_added));
      setData(data);
    }
    if (parameter === "date_added" && sortType === "dsc") {
      data.sort((a, b) => b.date_added.localeCompare(a.date_added));
      setData(data);
    }
    console.log(data);
    setClick((prev) => prev + 1);
  };
  useEffect(() => {
    
  }, [click]);
  return (
    <div>
      <Url setUrl={setUrl} handleSubmit={handleSubmit} />

      <div className="container col-6">
        <button onClick={fetchData} className="btn btn-secondary">fetch data</button>
        <table class="table table-striped">
          <thead>
            <tr>
              <th className="col-1" scope="col">
                #
              </th>
              <th className="col-3" scope="col">
                Full Url
              </th>
              <th className="col-2" scope="col">
                Shortened Url
              </th>
              <th className="col-2" scope="col">
                Clicks{" "}
                <button
                  onClick={() => handleSort("clicks", "asc")}
                  className="btn btn-sm btn-secondary"
                >
                  ↑
                </button>{" "}
                <button
                  onClick={() => handleSort("clicks", "dsc")}
                  className="btn btn-sm btn-secondary"
                >
                  ↓
                </button>
              </th>
              <th className="col-2" scope="col">
                Date Added{" "}
                <button
                  onClick={() => handleSort("date_added", "asc")}
                  className="btn btn-sm btn-secondary"
                >
                  ↑
                </button>{" "}
                <button
                  onClick={() => handleSort("date_added", "dsc")}
                  className="btn btn-sm btn-secondary"
                >
                  ↓
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td
                  className="text-wrap"
                  style={{
                    "max-width": "200px",
                    overflow: "hidden",
                    "text-overflow": "ellipsis",
                    "white-space": "normal",
                  }}
                >
                  {elem.full_url}
                </td>
                <td>
                  <button
                    onClick={(event) => handleClick(event)}
                    className="btn"
                  >
                    <a href>{elem.shortened_url}</a>
                  </button>
                </td>
                <td>{elem.clicks}</td>
                <td>{elem.date_added}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
