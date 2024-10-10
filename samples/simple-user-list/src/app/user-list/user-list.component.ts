import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="user-list-container">
      <h2>User List</h2>
      <ul>
        <li *ngFor="let user of users">
          <a [routerLink]="['/user', user.id]">{{ user.name }}</a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .user-list-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      margin-bottom: 1rem;
    }

    a {
      text-decoration: none;
      color: #007bff;
      font-size: 1.2rem;
    }
  `]
})
export class UserListComponent {
  users: any[] = [];
  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }
}
