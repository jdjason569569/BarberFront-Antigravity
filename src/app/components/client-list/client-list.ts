import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Supabase } from '../../services/supabase';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './client-list.html',
    styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
    clients = signal<any[]>([]);
    loading = signal(true);

    constructor(private supabase: Supabase, private router: Router) { }

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
