/**
 * utils.js - Funciones de utilidad para la aplicación
 * Contiene funciones comunes que pueden ser utilizadas en distintas partes del sistema
 */

// Función para mostrar mensaje de éxito
function showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
        
        // Ocultar mensaje de error si está visible
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    } else {
        console.log('Mensaje de éxito:', message);
    }
}

// Función para mostrar mensaje de error
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Ocultar mensaje de éxito si está visible
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'none';
        }
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    } else {
        console.error('Mensaje de error:', message);
    }
}

// Función para validar formato de correo electrónico
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar formato de RIF venezolano
function validateRIF(rif) {
    const rifRegex = /^[JGVE]-\d{8}-\d{1}$/;
    return rifRegex.test(rif);
}

// Función para formatear fecha
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('es-VE');
}

// Función para formatear montos como moneda
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('es-VE', { 
        style: 'currency', 
        currency: currency 
    }).format(amount);
}

// Exportar funciones si se está usando ES6 modules
// Si no se están usando módulos, estas funciones estarán disponibles globalmente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showSuccess,
        showError,
        validateEmail,
        validateRIF,
        formatDate,
        formatCurrency
    };
}
