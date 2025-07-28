const express = require("express");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionCtrl");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management (CRUD operations)
 */

/**
 * @swagger
 * /api/v1/transactions/get-transaction:
 *   get:
 *     summary: Get transactions based on filters (frequency, date range, type)
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: string
 *         required: true
 *         example: 64a9e5f93ab6c12345abcd67
 *       - in: query
 *         name: frequency
 *         schema:
 *           type: string
 *         required: true
 *         example: 7
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-07-01
 *       - in: queryemail
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-07-27
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense, all]
 *         example: all
 *     responses:
 *       200:
 *         description: Successfully fetched transactions
 *       404: user not found
 *       500:
 *         description: Server error
 */

router.get("/get-transaction", getTransactions);

/**
 * @swagger
 * /api/v1/transactions/add-transaction:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userid
 *               - amount
 *               - type
 *               - category
 *               - description
 *               - date
 *             properties:
 *               userid:
 *                 type: string
 *                 example: "64a9e5f93ab6c12345abcd67"
 *               amount:
 *                 type: number
 *                 example: 500
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: "expense"
 *               category:
 *                 type: string
 *                 example: "Food"
 *               reference:
 *                 type: string
 *                 example: "Paid"
 *               description:
 *                 type: string
 *                 example: "Lunch with friends"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-27"
 *     responses:
 *       201:
 *         description: Transaction added successfully
 *       404:
 *         description: Validation error or user doesn't exists
 *       500:
 *         description: Server error
 */
router.post("/add-transaction", addTransaction);

/**
 * @swagger
 * /api/v1/transactions/update-transaction/{id}:
 *   put:
 *     summary: Update an existing transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID to update
 *         schema:
 *           type: string
 *           example: "64a9e5f93ab6c12345abcd67"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               transactionId:
 *                 type: string
 *                 example: "64a9e5f93ab6c12345abcd67"
 *               payload:
 *                 type: object
 *                 properties:
 *                   userid:
 *                     type: string
 *                     example: "64a9e5f93ab6c12345abcd67"
 *                   amount:
 *                     type: number
 *                     example: 700
 *                   type:
 *                     type: string
 *                     enum: [income, expense]
 *                     example: "income"
 *                   category:
 *                     type: string
 *                     example: "Travel"
 *                   reference:
 *                     type: string
 *                     example: "Card Payment"
 *                   description:
 *                     type: string
 *                     example: "Bus tickets"
 *                   date:
 *                     type: string
 *                     format: date
 *                     example: "2025-07-28"
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found/ user not found
 *       500:
 *         description: Server error
 */
router.put("/update-transaction/:id", updateTransaction);

/**
 * @swagger
 * /api/v1/transactions/delete-transaction/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID to delete
 *         schema:
 *           type: string
 *           example: "64a9e5f93ab6c12345abcd67"
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.delete("/delete-transaction/:id", deleteTransaction);

module.exports = router;
