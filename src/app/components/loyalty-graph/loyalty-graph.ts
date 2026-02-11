import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Supabase } from '../../services/supabase';

@Component({
  selector: 'app-loyalty-graph',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './loyalty-graph.html',
  styleUrl: './loyalty-graph.css',
})
export class LoyaltyGraph implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      }
    },
    plugins: {
      legend: { display: false },
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: '#22d3ee',
        borderRadius: 5,
        borderSkipped: false
      }
    ]
  };

  constructor(private supabase: Supabase) { }

  async ngOnInit() {
    const data = await this.supabase.getLoyaltyData();
    this.barChartData.labels = data.map((item: any) => item.name);
    this.barChartData.datasets[0].data = data.map((item: any) => item.visits);
  }
}
