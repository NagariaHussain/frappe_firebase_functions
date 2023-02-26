const functions = require("firebase-functions");
const { FrappeApp } = require("frappe-js-sdk");
const { defineString } = require("firebase-functions/params");

const appURL = "https://hussain.codes";

const API_KEY = defineString("FRAPPE_API_KEY");
const API_SECRET = defineString("FRAPPE_API_SECRET");

function getToken() {
  return `${API_KEY.value()}:${API_SECRET.value()}`;
}

exports.totalExpenses = functions.https.onRequest(async (request, response) => {
  const frappe = new FrappeApp(appURL, {
    useToken: true,
    token: getToken,
    type: "token",
  });

  const db = frappe.db();

  const expenses = await db.getDocList("Expense", {
    fields: ["amount"],
  });

  let sum = 0;
  for (let expense of expenses) {
    sum += expense.amount;
  }

  response.send({ totalExpense: sum });
});
