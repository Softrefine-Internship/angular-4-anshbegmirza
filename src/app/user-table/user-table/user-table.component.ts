import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchValue: string = '';
  sortColumn: string = '';

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.users = await this.userService.getUsers(); // Fetching users from API
    this.filteredUsers = [...this.users];
    console.log(this.filteredUsers);
  }

  search(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchValue = searchTerm;
    console.log(this.searchValue, this.filteredUsers);
    this.filteredUsers = this.users.filter((user) => {
      return Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      );
    });
  }

  sort() {
    if (!this.sortColumn) return;

    this.filteredUsers.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB); // Sort alphabetically for strings
      } else {
        return valueA - valueB; // Sort numerically for numbers
      }
    });
  }

  onSortChanges(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.sortColumn = selectedValue;
    this.sort();
    console.log(this.sortColumn, this.filteredUsers);
  }
}
