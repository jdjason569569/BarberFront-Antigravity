import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase: SupabaseClient;
  private _currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    const supabaseUrl = 'https://gazeinbmabvfnqrkwbxw.supabase.co';
    const supabaseKey = 'sb_publishable_ZYUIAhXahLLjsFsGXfrVVA_Yg8vVe-P';
    this.supabase = createClient(supabaseUrl, supabaseKey);

    this.supabase.auth.onAuthStateChange((event, session) => {
      this._currentUser.next(session?.user ?? null);
    });
  }

  get currentUser$(): Observable<User | null> {
    return this._currentUser.asObservable();
  }

  get user() {
    return this._currentUser.value;
  }

  async signIn(email: string, pass: string) {
    return await this.supabase.auth.signInWithPassword({ email, password: pass });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  // Real data methods
  async getTurns() {
    const { data, error } = await this.supabase
      .from('turns')
      .select(`
        id,
        appointment_date,
        service_name,
        status,
        clients (
          full_name
        )
      `)
      .order('appointment_date', { ascending: true });

    if (error) {
      console.error('Error fetching turns:', error);
      return [];
    }
    return data;
  }

  async getLoyaltyData() {
    // This could also be a view in Supabase for better performance
    const { data, error } = await this.supabase
      .from('turns')
      .select(`
        client_id,
        clients (
          full_name
        )
      `)
      .eq('status', 'completed');

    if (error) {
      console.error('Error fetching loyalty data:', error);
      return [];
    }

    // Aggregate data
    const stats: Record<string, number> = {};
    data.forEach((turn: any) => {
      const name = turn.clients?.full_name || 'Desconocido';
      stats[name] = (stats[name] || 0) + 1;
    });

    return Object.entries(stats)
      .map(([name, visits]) => ({ name, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);
  }

  async getClients() {
    const { data, error } = await this.supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
    return data;
  }

  async getSummaryStats() {
    const { count: clientCount } = await this.supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    const { count: turnCount } = await this.supabase
      .from('turns')
      .select('*', { count: 'exact', head: true });

    return {
      totalClients: clientCount || 0,
      totalTurns: turnCount || 0,
    };
  }
}
