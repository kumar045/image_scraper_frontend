import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";
import axios from 'axios';
import { Link } from "react-router-dom";

const unsplash = new Unsplash({
  accessKey: "",
});
export default function SearchPhotos() {

  const [query, setQuery] = useState("");
  const [pics, setPics] = useState({pics:{}});
  const [color, setColors] = useState("");


  const searchPhotos = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: 'http://54.174.255.58:8000/api/start',
      data: {
        "query":query,
        "color":color,
        
        
      },
      headers: {
        'content-type': 'application/json',
      }
    };
    
    axios.request(options).then(function (response) {
      // console.log(response.data[0].response.collection_of_streambytes);
      setPics({pics:response.data[0].response.collection_of_streambytes})
      // console.log(pics) 
     

    }).catch(function (error) {
      console.error(error);
    });
 
  };
 

  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        {" "}
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={`put name of the object`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
           <input
          type="text"
          name="color"
          className="input"
          placeholder={`put color of the object`}
          value={color}
          onChange={(e) => setColors(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      <div className="card-list">
      {console.log(pics.pics)}
      {
      
      Object.entries(pics.pics).map(entry =>
          <div className="card" key={entry[0]}>
           <td onClick={()=> window.open(entry[0], "_blank")}>
            <img
           
              className="card--image"
              alt={entry[0]}
              src={entry[0]}
              width="100%"
              height="100%"
            ></img>
            </td>
          </div>)};
          
      </div>
    </>
  );
}
