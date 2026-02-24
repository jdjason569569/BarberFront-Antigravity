import { Injectable } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private _currentUser = new BehaviorSubject<User | null>(null);

  // Mocks persistentes en memoria durante la sesión
  private mockUser: User = {
    id: 'mock-123',
    email: 'test@barber.com',
    app_metadata: {},
    user_metadata: { full_name: 'Barbero de Prueba' },
    aud: 'authenticated',
    created_at: new Date().toISOString()
  } as User;

  constructor() {
    console.log('--- Supabase Service: Modo MOCK activado ---');
  }

  get currentUser$(): Observable<User | null> {
    return this._currentUser.asObservable();
  }

  get user() {
    return this._currentUser.value;
  }

  async signIn(email: string, pass: string): Promise<{ data: any, error: any }> {
    console.log('Mock SignIn:', email);
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'test@barber.com' && pass === '123456') {
      this._currentUser.next(this.mockUser);
      return { data: { user: this.mockUser, session: {} }, error: null };
    }

    return {
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials', status: 400 }
    };
  }

  async signUp(email: string, pass: string): Promise<{ data: any, error: any }> {
    console.log('Mock SignUp:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { user: { email } as User, session: null }, error: null };
  }

  async signOut() {
    this._currentUser.next(null);
    return { error: null };
  }

  async getTurns() {
    console.log('Mock getTurns');
    return [
      {
        id: 1,
        appointment_date: new Date().toISOString(),
        service_name: 'Corte Degradado',
        status: 'pending',
        clients: { full_name: 'Juan Pérez' }
      },
      {
        id: 2,
        appointment_date: new Date(Date.now() + 3600000).toISOString(),
        service_name: 'Barba Premium',
        status: 'completed',
        clients: { full_name: 'Mateo García' }
      },
      {
        id: 3,
        appointment_date: new Date(Date.now() + 7200000).toISOString(),
        service_name: 'Corte + Barba',
        status: 'pending',
        clients: { full_name: 'David Silva' }
      }
    ];
  }

  async getLoyaltyData() {
    console.log('Mock getLoyaltyData');
    return [
      { name: 'Juan Pérez', visits: 12 },
      { name: 'Mateo García', visits: 8 },
      { name: 'David Silva', visits: 5 },
      { name: 'Carlos Ruiz', visits: 3 },
      { name: 'Luis Torres', visits: 2 }
    ];
  }

  async getClients() {
    console.log('Mock getClients');
    return [
      { id: 1, full_name: 'Juan Pérez', email: 'juan@example.com', phone: '123456789', created_at: '2024-01-10' },
      { id: 2, full_name: 'Mateo García', email: 'mateo@example.com', phone: '987654321', created_at: '2024-02-15' },
      { id: 3, full_name: 'David Silva', email: 'david@example.com', phone: '456789123', created_at: '2024-02-20' }
    ];
  }

  async getSummaryStats() {
    console.log('Mock getSummaryStats');
    return {
      totalClients: 154,
      totalTurns: 1240,
    };
  }
}
