// dashboard-script.js — reads current user from sessionStorage and displays welcome and balance
(function(){
const FORM_KEY = 'brightBankUsers';
const CURRENT_KEY = 'brightBankCurrentUser';


function readUsers(){
return JSON.parse(localStorage.getItem(FORM_KEY) || '[]');
}


function getCurrent(){
return JSON.parse(sessionStorage.getItem(CURRENT_KEY) || 'null');
}


const logoutBtn = document.getElementById('logoutBtn');
logoutBtn && logoutBtn.addEventListener('click', function(){
sessionStorage.removeItem(CURRENT_KEY);
window.location.href = 'index.html';
});


const current = getCurrent();
if(!current || !current.username){
// no session, redirect to login
window.location.href = 'index.html';
} else {
const users = readUsers();
const user = users.find(u => u.username.toLowerCase() === current.username.toLowerCase());
const welcome = document.getElementById('welcomeMsg');
const sub = document.getElementById('subMsg');
const bal = document.getElementById('balanceAmount');


if(user){
welcome.textContent = `Welcome, ${user.username}!`;
sub.textContent = `Last login: ${new Date(user.lastLogin).toLocaleString()}`;
bal.textContent = `₦${Number(user.balance).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`;
} else {
// if user not found, redirect
window.location.href = 'index.html';
}
}
})();