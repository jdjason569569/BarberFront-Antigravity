import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Supabase } from '../../services/supabase';
import { LoyaltyGraph } from '../loyalty-graph/loyalty-graph';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule, RouterModule, LoyaltyGraph, TranslateModule],
    templateUrl: './stats.html',
    styleUrl: './stats.css',
})
export class Stats implements OnInit {
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
