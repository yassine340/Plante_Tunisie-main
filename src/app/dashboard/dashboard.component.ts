import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: number = 150;
  sales: number = 25000;
  orders: number = 345;
  revenue: number = 10000;

  constructor() {}

  ngOnInit(): void {
    // Fetch data when the component loads
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Call a service to get dashboard data (replace with real data)
    // For example: this.dashboardService.getData().subscribe(data => this.processData(data));
  }
}
