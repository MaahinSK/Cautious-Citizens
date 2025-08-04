
// Modal handling
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
document.getElementById("loginBtn").addEventListener("click", () => loginModal.style.display = "block");
document.getElementById("signupBtn").addEventListener("click", () => signupModal.style.display = "block");
document.getElementById("closeLogin").addEventListener("click", () => loginModal.style.display = "none");
document.getElementById("closeSignup").addEventListener("click", () => signupModal.style.display = "none");

document.getElementById("submitSignup").addEventListener("click", () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCred) => {
      return db.collection("users").doc(userCred.user.uid).set({ email });
    }).then(() => location.reload())
    .catch(console.error);
});

document.getElementById("submitLogin").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => location.reload())
    .catch(console.error);
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => location.reload());
});

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("auth-buttons").style.display = "none";
    document.getElementById("user-info").style.display = "flex";
    db.collection("users").doc(user.uid).get().then(doc => {
      const name = doc.exists && doc.data().name ? doc.data().name : user.email;
      document.getElementById("username-display").innerText = name;
    });
  }
});

// Highlight active page and handle logo click
document.addEventListener('DOMContentLoaded', function() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Highlight active link
  document.querySelectorAll('.navbar .center a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if ((linkPage === currentPage) || 
        (currentPage === 'index.html' && linkPage === '#') || 
        (linkPage === '#' && currentPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Make logo clickable to return home
  document.querySelector('.navbar .left h1').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});