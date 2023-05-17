import React, { useEffect, useState } from 'react'
import './Rowpost.css'
import Youtube from "react-youtube"
import axios from '../../Axios'
import {API_KEY, imageUrl} from "../../constants/Constents.jsx"


function Rowpost(props) {
  const [movies, setmovies] = useState([])
  const [urlId, seturlId] = useState("")
  useEffect(() => {
    axios.get(props.url).then((response)=>{
      console.log(response.data);
      setmovies(response.data.results)
    })
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie =(id)=>{
     console.log(id);
     axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if(response.data.results.length!==0){
        seturlId(response.data.results[0])
      }else{
        console.log("Array Empty");
      }
     })
  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {
            movies.map((obj)=>
              <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? "smallposter" : 'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`}/>
            )
          }    
        </div>
        {urlId && <Youtube opts={opts} videoId={urlId.key}/>}
    </div>
  )
}

export default Rowpost