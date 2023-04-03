const { WebhookClient, AttachmentBuilder } = require("discord.js");
require("dotenv").config()
const apiKey = process.env.NASA_KEY;
const webHOOK = new WebhookClient({
  url: process.env.Webhook_URL,
});
const delay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function validChaker(url) {
  let status =  await fetch(
    url
   )
     if (status.statusText === "ok") {
       return true;
     } else return false;
 }

function getPictureOfTheDay(apiKey) {
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
}

function fetchPictureOfTheDay() {
  getPictureOfTheDay(apiKey).then(async (imageUrl) => {
    // Do something with the image URL
    let valid = await validChaker(imageUrl.hdurl)
    
    webHOOK.send({
      content:
        "_" +
        imageUrl.explanation +
        "_\n\n `Copyright: " +
        imageUrl.copyright +
        "`",
      files: [
        new AttachmentBuilder()
          .setFile(valid ? imageUrl.hdurl : imageUrl.url)
          .setName(imageUrl.title + ".jpg"),
      ],
    });
  });
}

fetchPictureOfTheDay(); // Fetch the picture of the day immediately

setInterval(fetchPictureOfTheDay, delay); // Fetch the picture of the day every day

