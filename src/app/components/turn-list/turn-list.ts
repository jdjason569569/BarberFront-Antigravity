import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supabase } from '../../services/supabase';
import { TranslateModule } from '@ngx-translate/core';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, DragDropModule],
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

  drop(event: CdkDragDrop<any[]>) {
    const currentTurns = [...this.turns()];

    // 1. Guardamos los horarios originales en el orden actual
    const originalDates = currentTurns.map(t => t.appointment_date);

    // 2. Reordenamos los objetos de turno
    moveItemInArray(currentTurns, event.previousIndex, event.currentIndex);

    // 3. Reasignamos los horarios originales a los objetos en sus nuevas posiciones
    // Así, la posición 0 siempre mantiene la hora que tenía originalmente la posición 0, etc.
    const updatedTurns = currentTurns.map((turn, index) => ({
      ...turn,
      appointment_date: originalDates[index]
    }));

    this.turns.set(updatedTurns);
  }

  postponeTurn(index: number) {
    const currentTurns = this.turns().map((turn, i) => {
      if (i >= index) {
        const date = new Date(turn.appointment_date);
        date.setMinutes(date.getMinutes() + 10);
        return { ...turn, appointment_date: date.toISOString() };
      }
      return turn;
    });
    this.turns.set(currentTurns);
  }
}
