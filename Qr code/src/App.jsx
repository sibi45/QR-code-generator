import { useState } from 'react'
import './App.css'


function App() {
  const [img, setImg] = useState(""); 
  const[loading,setLoading] = useState(false);
  const [qrData,setQrData]=useState("")
  const[qrsize,setQrSize]=useState("")

  async function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrData)}`;
      setImg(url)

    }catch(error){
      console.log("Error generating QR code",error);

    }finally{
      setLoading(false);
    }
    
  }
   function downloadqr(){
    fetch(img)
    .then((response) => response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download ="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.log("Error downloading Qr code",error);
    });
   }

  return (
    <>
      <div className='app-container'>
        <h2>QR CODE GENERATOR</h2>
       {loading &&<p>Please Wait...</p>}
     {img && <img src={img} className='qr-code-image' />}
        <div>

          <label htmlFor="dataInput" className='input-label'>Data for QR code </label>
          <input type="text" value={qrData} id='dataInput ' placeholder='Enter data for Qr code' onChange={(e)=>{

            setQrData(e.target.value)
          }} />


          <label htmlFor="sizeInput" className='input-label'>Image Size (e.g,100):</label>
          <input type="text" value={qrsize} id='sizeInput' placeholder='Enter image size' onChange={(e)=>{
            setQrSize(e.target.value)
          }}/>

          <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR code </button>
          <button className='download-button' onClick={downloadqr}>Download QR code </button>
        </div>



      </div>
    </>
  )
}

export default App
