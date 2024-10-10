import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-detail-container">
      <div *ngIf="user" class="user-detail">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
        <p>Website: {{ user.website }}</p>
        <button (click)="goBack()">Back</button>
      </div>
    </div>
  `,
   styles: [`
    .user-detail-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      text-align: center;
    }

    .user-detail {
      background-color: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  `]
})
export class UserDetailComponent {
  user: any;
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
    });
  }

  goBack(): void {
    this.router.navigate(['/users']); 
  }
}
