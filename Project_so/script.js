// script.js — fixed login & session handling
(function(){
  const FORM_KEY = 'brightBankUsers';
  const CURRENT_KEY = 'brightBankCurrentUser';

  const form = document.getElementById('loginForm');
  const registerLink = document.getElementById('registerLink');

  // Read/write users
  function readUsers(){
    return JSON.parse(localStorage.getItem(FORM_KEY) || '[]');
  }
  function writeUsers(u){
    localStorage.setItem(FORM_KEY, JSON.stringify(u));
  }
  function findUser(users, username){
    return users.find(x => String(x.username).toLowerCase() === String(username).toLowerCase());
  }

  // Generate demo balance
  function randomBalance(){
    return Math.round((1000 + Math.random()*199000) * 100) / 100;
  }

  // ✅ Login form
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!username || !password){
      alert('Please enter username and password.');
      return;
    }

    let users = readUsers();
    let user = findUser(users, username);
    const now = new Date().toISOString();

    if(user){
      // Update existing user
      user.password = password;
      user.lastLogin = now;
    } else {
      // Create new user
      user = {
        username,
        password,
        created: now,
        lastLogin: now,
        balance: randomBalance()
      };
      users.push(user);
    }

    writeUsers(users);

    // ✅ Save active session BEFORE redirecting
    sessionStorage.setItem(CURRENT_KEY, JSON.stringify({ username: user.username }));

    // Delay to ensure storage is flushed
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 200);
  });

  // ✅ Create demo account button
  registerLink.addEventListener('click', function(e){
    e.preventDefault();
    const demo = prompt('Enter a demo username to create (e.g., alice)');
    if(!demo) return;

    let users = readUsers();
    if(findUser(users, demo)){
      alert('User already exists! Try signing in.');
      return;
    }

    const now = new Date().toISOString();
    const newUser = {
      username: demo,
      password: 'password123',
      created: now,
      lastLogin: now,
      balance: Math.round((5000 + Math.random()*50000)*100)/100
    };
    users.push(newUser);
    writeUsers(users);
    alert(`Demo user created:\nUsername: ${demo}\nPassword: password123`);

    // Auto-fill the form with created demo credentials
    document.getElementById('username').value = demo;
    document.getElementById('password').value = 'password123';
  });
})();
