import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supabase } from '../../services/supabase';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './turn-list.html',
  styleUrl: './turn-list.css',
})
export class TurnList implements OnInit {
  turns = signal<any[]>([]);

  constructor(private supabase: Supabase) { }

  async ngOnInit() {
    const data = await this.supabase.getTurns();
    this.turns.set(data);
  }
}
