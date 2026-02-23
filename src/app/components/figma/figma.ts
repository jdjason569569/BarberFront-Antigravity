import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Supabase } from '../../services/supabase';

@Component({
    selector: 'app-figma',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './figma.html',
    styleUrl: './figma.css'
})
export class FigmaComponent {
    userName = signal<string>('');
    today = new Date();

    // Signals for state
    selectedDate = signal<number>(this.today.getDate());
    currentMonth = signal<number>(this.today.getMonth());
    currentYear = signal<number>(this.today.getFullYear());

    weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Computed values for the calendar
    daysInMonth = computed(() => {
        const days = new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate();
        const arr = [];
        for (let i = 1; i <= days; i++) arr.push(i);
        return arr;
    });

    emptyDays = computed(() => {
        const firstDay = new Date(this.currentYear(), this.currentMonth(), 1).getDay();
        const arr = [];
        for (let i = 0; i < firstDay; i++) arr.push(i);
        return arr;
    });

    currentMonthName = computed(() => {
        const lang = this.translate.currentLang || 'es';
        try {
            return new Intl.DateTimeFormat(lang, { month: 'long' }).format(new Date(this.currentYear(), this.currentMonth()));
        } catch (e) {
            return 'Month';
        }
    });

    selectedDateDisplay = computed(() => {
        return `${this.selectedDate()} ${this.currentMonthName()}, ${this.currentYear()}`;
    });

    // Mock data for demo
    turns = signal([
        { day: 12, time: '09:00', client: 'John Doe', service: 'Haircut', status: 'confirmed' },
        { day: 12, time: '10:30', client: 'Jane Smith', service: 'Color', status: 'pending' },
        { day: 14, time: '15:00', client: 'Mike Ross', service: 'Beard', status: 'confirmed' },
        { day: 15, time: '11:00', client: 'Harvey Specter', service: 'Full Service', status: 'confirmed' }
    ]);

    selectedDayTurns = computed(() => {
        return this.turns().filter(t => t.day === this.selectedDate());
    });

    constructor(
        private supabase: Supabase,
        private router: Router,
        private translate: TranslateService
    ) {
        this.loadUser();
    }

    loadUser() {
        const user = this.supabase.user;
        if (user) {
            this.userName.set(user.email?.split('@')[0] || 'User');
        }
    }

    isToday(day: number) {
        const now = new Date();
        return day === now.getDate() &&
            this.currentMonth() === now.getMonth() &&
            this.currentYear() === now.getFullYear();
    }

    isSelected(day: number) {
        return day === this.selectedDate();
    }

    selectDate(day: number) {
        this.selectedDate.set(day);
    }

    prevMonth() {
        if (this.currentMonth() === 0) {
            this.currentMonth.set(11);
            this.currentYear.update(y => y - 1);
        } else {
            this.currentMonth.update(m => m - 1);
        }
    }

    nextMonth() {
        if (this.currentMonth() === 11) {
            this.currentMonth.set(0);
            this.currentYear.update(y => y + 1);
        } else {
            this.currentMonth.update(m => m + 1);
        }
    }

    get currentLang() {
        return this.translate.currentLang || 'es';
    }

    useLanguage(lang: string) {
        this.translate.use(lang);
    }

    async onLogout() {
        await this.supabase.signOut();
        this.router.navigate(['/login']);
    }
}
