import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Supabase } from '../../services/supabase';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './client-list.html',
    styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
    clients = signal<any[]>([]);
    loading = signal(true);

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
        const data = await this.supabase.getClients();
        this.clients.set(data);
        this.loading.set(false);
    }

    async onLogout() {
        await this.supabase.signOut();
        this.router.navigate(['/login']);
    }
}
