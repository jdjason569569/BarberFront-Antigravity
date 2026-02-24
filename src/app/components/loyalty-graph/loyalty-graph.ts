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
        ticks: { color: '#3d2b1f' }
      },
      y: {
        grid: { color: '#d2b48c' },
        ticks: { color: '#3d2b1f' }
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
        backgroundColor: '#8b0000',
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
