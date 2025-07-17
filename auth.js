// Auth functions
function showLoginModal(isAdmin = false) {
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${isAdmin ? 'Admin Login' : 'User Login'}</h2>
            <form id="loginForm">
                <input type="email" id="email" placeholder="Email" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
            <p id="loginError" class="error-message"></p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Handle form submission
    modal.querySelector('#loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = modal.querySelector('#email').value;
        const password = modal.querySelector('#password').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Check if admin (we'll implement this later)
                if (isAdmin) {
                    // Verify admin status
                    verifyAdmin(userCredential.user.uid);
                } else {
                    // Regular user login successful
                    window.location.href = 'user-dashboard.html'; // Create this later
                }
            })
            .catch((error) => {
                document.getElementById('loginError').textContent = error.message;
            });
    });
}

function verifyAdmin(userId) {
    db.collection('admins').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                // User is admin
                window.location.href = 'admin.html';
            } else {
                // User is not admin
                auth.signOut();
                alert('You are not authorized as an admin');
            }
        })
        .catch((error) => {
            console.error("Error verifying admin:", error);
        });
}

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is logged in
        document.querySelector('.login-btn').textContent = 'Log Out';
        document.querySelector('.login-btn').onclick = () => auth.signOut();
    } else {
        // User is logged out
        document.querySelector('.login-btn').textContent = 'Log In';
        document.querySelector('.login-btn').onclick = () => showLoginModal(false);
    }
});

function verifyAdmin(userId) {
    return db.collection('admins').doc(userId).get()
        .then((doc) => {
            if (doc.exists) {
                // User is admin - you can access additional admin data here
                const adminData = doc.data();
                console.log("Admin logged in:", adminData.name);
                return true;
            } else {
                // User is not admin
                return false;
            }
        });
}