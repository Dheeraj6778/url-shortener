import "bootstrap/dist/css/bootstrap.css";

import React, { useState } from "react";

function Url({handleSubmit,setUrl}) {
  
  return (
    <div>
      <div class="container col-3">
        <form className="d-flex" role="search">
          <input
            onChange={(event) => setUrl(event.target.value)}
            className="form-control me-2"
            type="url"
            placeholder="enter url..."
            aria-label="url"
          />
          <button onClick={handleSubmit} class="btn btn-outline-success" type="button">
            Shorten
          </button>
        </form>
      </div>
    </div>
  );
}

export default Url;
