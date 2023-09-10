import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import { getHistoricalBalance, getBalance, getTransactions } from "./services/getHistoricalBalances";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/balances", async (req, res) => {
  const balance = await getBalance();
  return res.status(200).json(balance);
});

app.get("/transactions", async (req, res) => {
  const transactions = await getTransactions();
  return res.status(200).json(transactions);
});

app.get("/historical-balances", async (req, res) => {
  let fromQuery = req.query.from!.toString();
  let toQuery = req.query.to!.toString();
  let from = new Date(fromQuery);
  let to = new Date(toQuery);
  const historicalBalance = await getHistoricalBalance(from, to);
  return res.json(historicalBalance);
});

export default app;
