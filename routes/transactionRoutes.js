const express = require("express");
const { addTransaction, getTransactions, updateTransaction, deleteTransaction } = require("../controllers/transactionCtrl");

const router = express.Router();

//ROUTES
// GET
router.post("/get-transaction", getTransactions)

// POST
router.post("/add-transaction", addTransaction)

// PUT
router.post("/update-transaction", updateTransaction)

// DELETE
router.delete("/delete-transaction", deleteTransaction)


module.exports = router;
