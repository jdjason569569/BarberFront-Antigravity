
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://gazeinbmabvfnqrkwbxw.supabase.co', 'sb_publishable_ZYUIAhXahLLjsFsGXfrVVA_Yg8vVe-P');

async function main() {
    const email = 'barberia_test_' + Date.now() + '@example.com';
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: 'Password123!',
    });
    if (error) console.log('ERROR:', error.message);
    else console.log('SUCCESS: User created with email:', email);
}
main();
