
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://gazeinbmabvfnqrkwbxw.supabase.co';
const supabaseKey = 'sb_publishable_ZYUIAhXahLLjsFsGXfrVVA_Yg8vVe-P';
const supabase = createClient(supabaseUrl, supabaseKey);

async function create() {
    const email = 'nuevo_barbero_' + Math.floor(Math.random() * 1000) + '@test.com';
    const password = 'Password@2026';

    console.log('--- Creando Usuario de Prueba ---');
    console.log('Email:', email);
    console.log('Password:', password);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('¡Éxito!');
        console.log('ID de Usuario:', data.user?.id);
        console.log('Estado:', data.session ? 'Sesión iniciada' : 'Pendiente de confirmación (si el correo existe)');
    }
}

create();
