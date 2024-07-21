let username = localStorage.getItem('username') || prompt('Enter your username:', 'Guest');
let referralCode = localStorage.getItem('referralCode') || prompt('Enter your referral code (if any):', 'XXXXXX');

document.getElementById('username').textContent = username;
document.getElementById('referral-code').textContent = referralCode;

localStorage.setItem('username', username);
localStorage.setItem('referralCode', referralCode);

document.getElementById('achievements').textContent = 'First Tap'; // Example
