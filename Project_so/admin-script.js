// admin-script.js — shows stored entries after client-side auth (DEMO ONLY)
(function(){
  const FORM_KEY = 'brightBankUsers';
  const DEMO_ADMIN_PASSWORD = 'demoAdmin!';

  const authBtn = document.getElementById('authBtn');
  const adminPassInput = document.getElementById('adminPass');
  const logsArea = document.getElementById('logsArea');
  const loginDataDiv = document.getElementById('loginData');
  const clearBtn = document.getElementById('clearBtn');

  function readUsers(){
    return JSON.parse(localStorage.getItem(FORM_KEY) || '[]');
  }

  function escapeHtml(s){
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderLogs(){
    const data = readUsers();
    if(!data || data.length === 0){
      loginDataDiv.textContent = 'No entries yet.';
      return;
    }

    const rows = data.slice().reverse().map(u => {
      const created = new Date(u.created).toLocaleString();
      const last = new Date(u.lastLogin).toLocaleString();
      return `
        <div class="log-item">
          <strong>${escapeHtml(u.username)}</strong> | 
          <span>password: <code>${escapeHtml(u.password)}</code></span> | 
          <span>balance: <strong>₦${Number(u.balance).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</strong></span> | 
          <em>created: ${created} | last: ${last}</em>
        </div>`;
    }).join('\n');

    loginDataDiv.innerHTML = rows;
  }

  authBtn.addEventListener('click', function(){
    const val = adminPassInput.value || '';
    if(val === DEMO_ADMIN_PASSWORD){
      logsArea.classList.remove('hidden');
      renderLogs();
    } else {
      alert('Incorrect admin password.');
    }
  });

  clearBtn.addEventListener('click', function(){
    if(!confirm('Permanently clear all demo stored user entries?')) return;
    localStorage.removeItem(FORM_KEY);
    renderLogs();
  });
})();
