import { useState ,useRef } from 'react'
import './App.css'
import TextField from '@mui/material/TextField';
import axios from 'axios'


function App() {

  const [url, seturl] = useState('')
  const [response, setresponse] = useState(false)
  const [link, setlink] = useState(false)
  const [analytics,setanalytics] = useState('')
  const [coderes,getcoderes] = useState('')
  const [Searched ,getSearched] = useState('')


  const handleclick = async ()=>{
    const response = await axios.post('https://url-shortner-git-main-vaibhav211002s-projects.vercel.app/url',{url})
    const data = response.data;
    setresponse(data.data); 
    const linktoclick = `https://url-shortner-git-main-vaibhav211002s-projects.vercel.app/api/${data.data}`
    setlink(linktoclick)
  }

  const textRef = useRef(null);
  const handleCopy = () => {
    if (textRef.current) {
      copy(textRef.current.textContent); 

    }
  };


  const getspecificanal = async ()=>{ 
    const reponse = await axios.get(`https://url-shortner-git-main-vaibhav211002s-projects.vercel.app/api/analytics/${coderes}`)
    const data =reponse.data;
    getSearched(data.url.totalClicks)
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      alert('Failed to copy text to clipboard.');
    }
  }

  return (
    <>
    <div className='Whole'>
    <div className="container">
      <h2 className="main-heading">Url Shortner </h2>
      <div className="secondary-heading">
        <div className='Info-box'>
          <p>Effortlessly shorten your URLs and gain comprehensive analytics, including click counts and timestamp data. Our service allows you to create concise, trackable links that provide insights into user engagement, helping you understand when and how often your links are accessed.</p>
        </div>
        <div className='fields'>
        <TextField 
        id="outlined-basic" 
        label="Enter Link" 
        variant="outlined"
        onChange={(e)=>seturl(e.target.value)}
        value={url}
        fullWidth
        className='input-field'
        />
        <button onClick={handleclick} className='Button'>Shorten Link</button>
        </div>
      <div className='output-1'>
        <div className="collect">
          <p ref={textRef}>{(response)?"Your Shortend Code: "+ response:"Enter Link to Get Code"}</p>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
        <div className='link'>
        <p ref={textRef}><h4>{(link)?" Your Shortend Link: ":"No Link Available"}</h4>{link}</p>
        <button onClick={copyToClipboard}>Copy</button>
        </div>
        
        
      </div>
      </div>
      <div className='Analytics'> 
        <div className='Analytics-box'>
        <h2>Get Analytics</h2>
          <div className='search-box'>
            <TextField 
            id="outlined-basic" 
            label="Enter Shortened Link Code" 
            variant="outlined"
            onChange={(e)=>getcoderes(e.target.value)}
            value={coderes}
            className='input-field2'
            />
            <button type="button" onClick={getspecificanal}>Get Analytics</button>
            <div className='Analytics-box'> 
            {(Searched)?(<ul>
            <h4>Total No. of clicks: {Searched.length}</h4>
            {Searched.map((data,index)=>(
              <li key={index}>{data.timeStops}</li>
            ))}
            </ul>):"Enter the code to get analytics"}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
