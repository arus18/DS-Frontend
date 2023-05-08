import { BASE_URL } from './config.js';

const signupForm = document.querySelector('#signup form');
const signupTabLink = document.querySelector('.tab a[href="#login"]');
const loginForm = document.querySelector('#login form');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(signupForm);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  };
  try {
    const response = await fetch(`${BASE_URL}/users/buyers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    signupTabLink.click();
  } catch (err) {
    console.error(err);
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  try {
    const response = await fetch('http://192.168.49.2:30833/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    console.log(response);
    if (response.status === 200) {
      const {
        token
      } = await response.json();
      sessionStorage.setItem('jwt', token);
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
  }
});
