const User = require("../models/userModel");
const transactionModel = require("../models/transactionModel");
const moment = require("moment");


// const getTransactions = async (req, res) => {

//     try {
//         const { userid, frequency, customDate, type } = req.body;
//         const transactions = await transactionModel.find({

//             ...(frequency !== 'custom' ? {
//                 date: {
//                     $gt: moment().subtract(Number(frequency), 'd').toDate()
//                 }

//             } : {
//                 date: {
//                     $gte: customDate[0],
//                     $lte: customDate[1]
//                 }
//             }),

//             userid: req.body.userid,

//             ...(type !== 'all' ? {
//                 type: type
//             } : {})
//         });
//         res.status(200).json(transactions)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }

// }

const getTransactions = async (req, res) => {
  try {
    const { userid, frequency, startDate, endDate, type } = req.query;

    const userExists = await User.exists({ _id: userid });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const query = {
      userid,
      ...(frequency !== "custom"
        ? {
          date: {
            $gt: moment().subtract(Number(frequency), "d").toDate(),
          },
        }
        : {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        }),
      ...(type !== "all" ? { type } : {}),
    };

    const transactions = await transactionModel.find(query).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};


const addTransaction = async (req, res) => {

  try {
    const { userid } = req.body;
    const userExists = await User.exists({ _id: userid });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send('transaction created')

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }

}

const updateTransaction = async (req, res) => {
  try {

    const { userid } = req.body.payload;
    console.log(req.body.payload)
    const userExists = await User.exists({ _id: userid });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    await transactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)
    res.status(200).send('transaction updated')

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const deleteTransaction = async (req, res) => {

  try {

    const transaction = await transactionModel.exists({ _id: req.body.transactionId });
     if (!transaction) {
      return res.status(404).json({ message: "transaction not found" });
    }
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId })
    res.status(200).send('transaction deleted')
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

module.exports = { getTransactions, addTransaction, updateTransaction, deleteTransaction }