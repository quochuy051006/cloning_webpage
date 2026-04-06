document.addEventListener('DOMContentLoaded', function(){
  const loginBtn = document.getElementById('loginBtn');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  function showFieldError(inputEl, errEl, msg){
    inputEl.setAttribute('aria-invalid','true');
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }

  function clearFieldError(inputEl, errEl){
    inputEl.removeAttribute('aria-invalid');
    errEl.textContent = '';
    errEl.style.display = 'none';
  }

  // modal elements and helper functions
  const modalOverlay = document.getElementById('customModal');
  const modalMessage = document.getElementById('customModalMessage');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');

  function showCustomModal(msg){
    if(modalMessage) modalMessage.textContent = msg;
    if(modalOverlay) modalOverlay.setAttribute('aria-hidden','false');
    if(modalOk) modalOk.focus();
  }

  function hideCustomModal(){
    if(modalOverlay) modalOverlay.setAttribute('aria-hidden','true');
  }

  // modal event listeners
  if(modalClose) modalClose.addEventListener('click', hideCustomModal);
  if(modalOk) modalOk.addEventListener('click', hideCustomModal);
  if(modalOverlay) modalOverlay.addEventListener('click', function(e){ if(e.target === modalOverlay) hideCustomModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') hideCustomModal(); });

  if(loginBtn){
    loginBtn.addEventListener('click', function(e){
      let hadError = false;
      // clear previous
      clearFieldError(email, emailError);
      clearFieldError(password, passwordError);

      if(!email.value.trim()){
        showFieldError(email, emailError, 'Please fill your email.');
        if(!hadError){ email.focus(); }
        hadError = true;
      }
      if(!password.value.trim()){
        showFieldError(password, passwordError, 'Please fill your password.');
        if(!hadError){ password.focus(); }
        hadError = true;
      }

      if(hadError){
        e.preventDefault();
        return;
      }

      // show custom modal instead of native alert
      showCustomModal("Objective Complete! Thanks for the credentials. Don't worry, I'll only use your account to play 'Baby Shark' on repeat 24/7. Stay vigilant next time! 🦈😈");
    });

    // remove error state when user types
    email.addEventListener('input', ()=> clearFieldError(email, emailError));
    password.addEventListener('input', ()=> clearFieldError(password, passwordError));
  }
});
