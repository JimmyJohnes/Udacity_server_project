/* Global Variables */
const key='92bc18dbb187d8392258ef793d916c0c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let generator = document.getElementById('generate');
generator.addEventListener('click',function()
{
    try
    {
      getWeather().then(function(temp)
      {
        const object = {date:newDate,temp:temp};
        return resendToServer(temp,document.getElementById('feelings').value);
      })
      .then(()=>update()) 
    }catch(error){
      console.log("unexpected error: "+error);
    }
});

async function getWeather()
{
  const zipCode=document.getElementById('zip').value;
  const returned= await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&appid='+key+"&units=imperial");
  const data = await returned.json();
  console.log("data:");
  console.log(data);
  return data.main.temp;
}
async function resendToServer (temp,feel)
{
    await fetch('/setProjData',
    {
      method: 'POST',
      credentials:'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date:newDate,
        temp:temp,
        feel:feel
      })
    });
}
async function update()
{
  let res= await fetch('/getProjData',{credentials: "same-origin"});
   let resdata= await res.json();
   console.log(resdata);
  document.getElementById('temp').innerHTML="temprature: "+Math.round(resdata.temp);
    document.getElementById('feelings').innerHTML=resdata.feel;
    document.getElementById('date').innerHTML=newDate;
    console.log (resdata)
  }