/* Global Variables */
const generateButton = document.querySelector("#generate");
const DOMDate = document.querySelector("#date");
const DOMTemp = document.querySelector("#temp");
const DOMContent = document.querySelector("#content");
function getResponse() {
  return document.querySelector("#feelings").value;
}
function getZipCode() {
  return document.querySelector("#zip").value;
}
const APIKey = "3dcae940f9690e13c5e82e27fc056114";
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + "." + date.getDate() + "." + date.getFullYear();
/* Function to POST data */
const projectData = async () => {
  const url = "https://api.openweathermap.org/data/2.5/weather?";
  const query = getZipCode();
  const response = await fetch(
    `${url}id=${query}&appid=${APIKey}&units=metric`
  );

  try {
    const weatherData = await response.json();
    const responseData = await postData(weatherData.main.temp, newDate);
    updateUI(responseData);
  } catch (err) {
    console.log(err);
  }
};
const postData = async (temperature, date) => {
  const userResponse = getResponse();
  const data = { temperature, date, userResponse };
  const response = await fetch("/data", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log(err);
    return err;
  }
};
function updateUI(responseData) {
  DOMTemp.innerHTML = `${responseData.temperature}`;
  DOMDate.innerHTML = `${responseData.date}`;
  DOMContent.innerHTML = `${responseData.userResponse}`;
}
generateButton.addEventListener("click", projectData);
