// utils/otpStore.js
const otpMap = new Map();

const saveOtp = (email, otp, expiryTime) => {
  otpMap.set(email, { otp, expiryTime });
};

const verifyOtp = (email, enteredOtp) => {
  const record = otpMap.get(email);
  if (!record) return false;

  const { otp, expiryTime } = record;
  const now = new Date().getTime();

  if (now > expiryTime || otp !== enteredOtp) {
    otpMap.delete(email);
    return false;
  }

  otpMap.delete(email); // one-time use
  return true;
};

module.exports = { saveOtp, verifyOtp };
