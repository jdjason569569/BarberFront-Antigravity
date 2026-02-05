import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Supabase } from '../../services/supabase';
import { LoyaltyGraph } from '../loyalty-graph/loyalty-graph';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule, RouterModule, LoyaltyGraph],
    templateUrl: './stats.html',
    styleUrl: './stats.css',
})
export class Stats implements OnInit {
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
