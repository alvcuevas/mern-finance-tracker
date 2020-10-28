const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Add transaction
// @route   POST /api/transactions
const addTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const validationErrors = Object.values(err.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                error: validationErrors
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'Transaction not found'
            });
        }

        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: []
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
}