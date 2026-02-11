import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Supabase } from '../../services/supabase';
import { TurnList } from '../turn-list/turn-list';
import { LoyaltyGraph } from '../loyalty-graph/loyalty-graph';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TurnList, LoyaltyGraph, TranslateModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats = { totalClients: 0, totalTurns: 0 };

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

  get userName() {
    return this.supabase.user?.email?.split('@')[0] || 'User';
  }

  async ngOnInit() {
    this.stats = await this.supabase.getSummaryStats();
  }

  async onLogout() {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}
