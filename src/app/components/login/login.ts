import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  isRegistering = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  constructor(
    private supabase: Supabase,
    private router: Router,
    private translate: TranslateService
  ) { }

  get currentLang() {
    return this.translate.currentLang || 'es';
  }

  useLanguage(lang: string) {
    this.translate.use(lang);
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.isRegistering()) {
      await this.onSignUp();
    } else {
      await this.onLogin();
    }
  }

  async onLogin() {
    this.loading.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    try {
      const { data, error } = await this.supabase.signIn(this.email, this.password);

      if (error) {
        if (error.status === 400 || error.message.includes('Invalid login credentials')) {
          this.error.set(this.translate.instant('LOGIN.ERROR_CREDENTIALS'));
        } else {
          this.error.set(this.translate.instant('LOGIN.ERROR_CONNECTION', { message: error.message }));
        }
        return;
      }

      if (data.user) {
        this.router.navigate(['/dashboard']);
      }
    } catch (e: any) {
      console.error('Login error:', e);
      this.error.set(this.translate.instant('LOGIN.ERROR_UNEXPECTED'));
    } finally {
      this.loading.set(false);
    }
  }

  async onSignUp() {
    this.loading.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    try {
      const { data, error } = await this.supabase.signUp(this.email, this.password);

      if (error) {
        this.error.set(this.translate.instant('LOGIN.ERROR_CONNECTION', { message: error.message }));
        return;
      }

      if (data.user) {
        const message = data.session
          ? this.translate.instant('LOGIN.SUCCESS_SIGNUP_AUTO')
          : this.translate.instant('LOGIN.SUCCESS_SIGNUP_CONFIRM');

        this.successMessage.set(message);
        this.isRegistering.set(false);
        this.password = ''; // Clear password for security
      }
    } catch (e: any) {
      console.error('Signup error:', e);
      this.error.set(this.translate.instant('LOGIN.ERROR_UNEXPECTED'));
    } finally {
      this.loading.set(false);
    }
  }

  toggleMode() {
    this.isRegistering.update(v => !v);
    this.error.set(null);
    this.successMessage.set(null);
  }
}
