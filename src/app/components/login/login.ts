import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private supabase: Supabase, private router: Router) { }

  async onLogin(event: Event) {
    event.preventDefault();
    this.loading.set(true);
    this.error.set(null);

    try {
      const { data, error } = await this.supabase.signIn(this.email, this.password);

      if (error) {
        if (error.status === 400 || error.message.includes('Invalid login credentials')) {
          this.error.set('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        } else if (error.message.includes('Database error querying schema')) {
          this.error.set('Hubo un problema con la base de datos de usuarios. Por favor, reporta este error.');
        } else {
          this.error.set('Error de conexión: ' + error.message);
        }
        return;
      }

      if (data.user) {
        this.router.navigate(['/dashboard']);
      }
    } catch (e: any) {
      console.error('Login error:', e);
      this.error.set('Ocurrió un error inesperado al intentar iniciar sesión.');
    } finally {
      this.loading.set(false);
    }
  }
}
