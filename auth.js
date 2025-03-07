/**
 * auth.js - Módulo de autenticación
 * Contiene todas las funciones relacionadas con registro, inicio de sesión
 * y gestión de usuarios en el sistema
 */

// Almacenamiento local para usuarios (simulando una base de datos)
let users = JSON.parse(localStorage.getItem('users')) || [
    // Usuario de demostración predeterminado
    {
        id: 1,
        email: "demo@facturaml.com",
        password: "12345", // En producción usar contraseñas hasheadas
        companyName: "Empresa Demo",
        companyRif: "J-12345678-9",
        address: "Caracas, Venezuela",
        phone: "0412-1234567",
        isSpecialTaxpayer: false,
        registrationDate: "2023-01-01T00:00:00.000Z"
    }
];

// Función para validar formulario de registro
function validateRegisterForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const companyName = document.getElementById('companyName').value;
    const companyRif = document.getElementById('companyRif').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    
    if (!email || !password || !companyName || !companyRif || !address || !phone) {
        showError('Por favor completa todos los campos obligatorios');
        return false;
    }
    
    // Validar formato de correo
    if (!validateEmail(email)) {
        showError('Por favor ingresa un correo electrónico válido');
        return false;
    }
    
    // Validar formato de RIF (J-12345678-9)
    if (!validateRIF(companyRif)) {
        showError('El formato del RIF debe ser J-12345678-9');
        return false;
    }
    
    // Verificar si el correo ya está registrado
    if (users.some(user => user.email === email)) {
        showError('Este correo ya está registrado');
        return false;
    }
    
    return true;
}

// Función para registrar nuevo usuario
function registerUser() {
    if (!validateRegisterForm()) return;
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const companyName = document.getElementById('companyName').value;
    const companyRif = document.getElementById('companyRif').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const isSpecialTaxpayer = document.getElementById('isSpecialTaxpayer').checked;
    
    // Crear objeto de usuario
    const newUser = {
        id: users.length + 1,
        email,
        password, // En una aplicación real, deberías hashear la contraseña
        companyName,
        companyRif,
        address,
        phone,
        isSpecialTaxpayer,
        registrationDate: new Date().toISOString()
    };
    
    // Agregar a la lista de usuarios
    users.push(newUser);
    
    // Guardar en localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Mostrar mensaje de éxito
    showSuccess('¡Registro exitoso! Ahora puedes iniciar sesión');
    
    // Limpiar formulario
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('companyName').value = '';
    document.getElementById('companyRif').value = '';
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('isSpecialTaxpayer').checked = false;
    
    // Cambiar a tab de login después de un breve retraso
    setTimeout(() => {
        switchTab('login');
    }, 1500);
}

// Función para iniciar sesión
function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showError('Por favor ingresa tu correo y contraseña');
        return;
    }
    
    // Buscar usuario
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Guardar sesión
        localStorage.setItem('currentUser', JSON.stringify(user));
        showSuccess('¡Inicio de sesión exitoso!');
        
        // Redireccionar al dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        showError('Correo o contraseña incorrectos');
    }
}

// Función para cerrar sesión
function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Función para verificar si el usuario está autenticado
function checkAuthentication() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return null;
    }
    
    return JSON.parse(currentUser);
}

// Función para obtener el usuario actual
function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

// Función para actualizar los datos del perfil del usuario
function updateUserProfile(updatedData) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        return false;
    }
    
    // Actualizar datos del usuario en la "base de datos"
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        // Actualizar los campos permitidos
        users[userIndex] = {
            ...users[userIndex],
            companyName: updatedData.companyName || users[userIndex].companyName,
            companyRif: updatedData.companyRif || users[userIndex].companyRif,
            address: updatedData.address || users[userIndex].address,
            phone: updatedData.phone || users[userIndex].phone,
            isSpecialTaxpayer: updatedData.isSpecialTaxpayer !== undefined ? 
                              updatedData.isSpecialTaxpayer : 
                              users[userIndex].isSpecialTaxpayer
        };
        
        // Si se actualiza la contraseña
        if (updatedData.password) {
            users[userIndex].password = updatedData.password;
        }
        
        // Actualizar el usuario en localStorage
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        return true;
    }
    
    return false;
}

// Si hay algún script que debe ejecutarse al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los botones de formulario si existen en la página actual
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', registerUser);
    }
    
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', loginUser);
    }
});

// Exportar funciones si se está usando ES6 modules
// Si no se están usando módulos, estas funciones estarán disponibles globalmente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        registerUser,
        loginUser,
        logoutUser,
        checkAuthentication,
        getCurrentUser,
        updateUserProfile
    };
}
