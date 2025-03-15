import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports:[RouterLink]
})
export class AdminDashboardComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.loadCharts();
  }

  loadCharts() {
    new Chart("usersChart", {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
          label: "New Users",
          data: [50, 100, 150, 200, 250],
          borderColor: "blue",
          fill: false
        }]
      }
    });

    new Chart("earningsChart", {
      type: 'bar',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
          label: "Earnings ($)",
          data: [1000, 2000, 3000, 4000, 5000],
          backgroundColor: "green"
        }]
      }
    });
  }
}

