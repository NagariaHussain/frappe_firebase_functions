const functions = require("firebase-functions");
const { FrappeApp } = require("frappe-js-sdk");
const { defineString } = require("firebase-functions/params");

const appURL = "https://hussain.codes";

const API_KEY = defineString("FRAPPE_API_KEY");
const API_SECRET = defineString("FRAPPE_API_SECRET");

function getToken() {
  return `${API_KEY.value()}:${API_SECRET.value()}`;
}

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  const frappe = new FrappeApp(appURL, {
    useToken: true,
    token: getToken,
    type: "token",
  });

  const db = frappe.db();
  let count;
  try {
    count = await db.getCount("User");
  } catch(e) {
    console.log(e)
  }
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send(`User Count: ${count}!`);
});
