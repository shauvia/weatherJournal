async function postInput(url = '', input = {}){
  let response = await fetch(url, {method: "POST", headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(input),
});
  console.log("Fetch returned: ", response);
  let NewRes = await response.text();
  console.log('NewRes: ', NewRes);
}

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5289d2618fbe314688d67b5f54a15e24';
const units = '&units=imperial'

async function getWeather(baseURL, zip, apiKey){
  console.log('adress:', baseURL+zip+apiKey )
  let response = await fetch(baseURL+zip+apiKey+units);
  let data = await response.json();
  console.log('data:', data);
  return data;
}

let today = new Date();

let dayDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();  // from https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript

async function postData(url = '', input){
  let response = await fetch(url, {method: "POST", headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(input),
});
  console.log("Fetch returned: ", response);
  let NewRes = await response.text();
  console.log('NewRes: ', NewRes);
}

async function getAllData(url = '') {
  let response = await fetch(url, { method: 'GET' }); // domyslnie zapytanie GET
  console.log("Fetch returned:", response);
  let content = await response.json(); // dobranie sie do tresci jest asynchroniczne, trzeba czekac
  console.log('content', content);
  return content;
}


function displayAllData(data){
  let date = document.getElementById('date').innerHTML = data.date;
  let temp = document.getElementById('temp').innerHTML = data.temp +" " + "F";
  let content = document.getElementById('content').innerHTML = data.userResponse;
  console.log(1);
}

function performAction2(event){
  const zipCode = document.getElementById('zip').value;
  const userInput = document.getElementById('feelings').value;
  console.log("zipCode: ", zipCode);
  getWeather(baseURL, zipCode, apiKey).then((weatherInfo) => {
    console.log("temp", weatherInfo.main.temp);
    postData('http://localhost:3000/postData', {temp: weatherInfo.main.temp, date: dayDate, userResponse: userInput}).then(() => {
    getAllData('http://localhost:3000/getData').then((allData) => {
      console.log('allData', allData);
      displayAllData(allData);
      });
    });
  });
}

document.getElementById('generate').addEventListener('click', performAction2);

(async() => {
  let allData = await getAllData('http://localhost:3000/getData');
  displayAllData(allData);
})();

// async function performAction(event){
//   const zipCode = document.getElementById('zip').value;
//   const userInput = document.getElementById('feelings').value;
//   console.log("zipCode: ", zipCode);
//   weatherInfo = await getWeather(baseURL, zipCode, apiKey);
//   console.log("temp", weatherInfo.main.temp);
//   await postData('http://localhost:3000/postData', {temp: weatherInfo.main.temp, date: dayDate, userResponse: userInput});
//   allData = await getAllData('http://localhost:3000/getData');
//   console.log('allData', allData);
//   displayAllData(allData);
// }
// keeping the function because I like it better then chaining promises.


