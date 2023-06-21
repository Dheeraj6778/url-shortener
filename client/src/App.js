import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Url from "./components/Url";

function App() {
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState([]);
  const [click, setClick] = useState(0);
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
    } catch (err) {
      console.log("error in fetching data");
    }
  };
  let handleClick = async (event) => {
    console.log(event.target.innerText);
    
    try{
      let url_=event.target.innerText;
      let resp=await axios.get(url_);
      console.log(resp);
    }
    catch(err){
      console.log("unable to redirect");
    }
  };

  useEffect(() => {
    fetchData();
  }, [click]);
  return (
    <div>
      <Url setUrl={setUrl} handleSubmit={handleSubmit} />
      <div className="container col-6">
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
              <th className="col-1" scope="col">
                Clicks
              </th>
              <th className="col-2" scope="col">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody>
            {urlData.map((elem, index) => (
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
                    className="btn btn-secondary"
                  >
                    {elem.shortened_url}
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
