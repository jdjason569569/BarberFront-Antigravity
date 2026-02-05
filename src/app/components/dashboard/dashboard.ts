import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Supabase } from '../../services/supabase';
import { TurnList } from '../turn-list/turn-list';
import { LoyaltyGraph } from '../loyalty-graph/loyalty-graph';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TurnList, LoyaltyGraph],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  stats = { totalClients: 0, totalTurns: 0 };

  constructor(private supabase: Supabase, private router: Router) { }

  async ngOnInit() {
    this.stats = await this.supabase.getSummaryStats();
  }

  async onLogout() {
    await this.supabase.signOut();
    this.router.navigate(['/login']);
  }
}
