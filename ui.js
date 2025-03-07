/**
 * ui.js - Módulo de interfaz de usuario
 * Contiene funciones para manejar la interacción con la interfaz
 * como cambiar entre pestañas, mostrar/ocultar elementos, etc.
 */

// Función para cambiar entre tabs (iniciar sesión / registrarse)
function switchTab(tab) {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (!loginTab || !registerTab || !loginForm || !registerForm) {
        return; // No estamos en la página de autenticación
    }
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    }
    
    // Ocultar mensajes al cambiar de tab
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}

// Inicializar eventos de UI cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar eventos para cambiar entre pestañas en la página de autenticación
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const showLoginLink = document.getElementById('showLoginLink');
    const showRegisterLink = document.getElementById('showRegisterLink');
    
    if (loginTab) {
        loginTab.addEventListener('click', function() {
            switchTab('login');
        });
    }
    
    if (registerTab) {
        registerTab.addEventListener('click', function() {
            switchTab('register');
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function() {
            switchTab('login');
        });
    }
    
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function() {
            switchTab('register');
        });
    }
});

// Exportar funciones si se está usando ES6 modules
// Si no se están usando módulos, estas funciones estarán disponibles globalmente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchTab
    };
}
