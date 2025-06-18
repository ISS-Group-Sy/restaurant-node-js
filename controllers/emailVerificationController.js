const EmailVerification = require('../models/emailVerification');
const User = require('../models/user');

exports.verifyOTP = async (req, res) => {
    try {
        const { userId, otpCode } = req.body;
        const record = await EmailVerification.findOne({ userId, otpCode });

        if (!record) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        if (record.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Verification code expired' });
        }   

        await User.findByIdAndUpdate(userId, { isVerified: true });
        await EmailVerification.deleteMany({ userId });

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error verifying email', error: err.message });
    }
};
