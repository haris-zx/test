import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { getPriorityText, getStatusText, Task } from '../dto/CreateTaskDto';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
   imports: [
      CommonModule,
      ReactiveFormsModule,NgbModule,FormsModule
    ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  
  filterForm!: FormGroup;
  tasks: Task[] = [];
  loading = false;

  

  

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: [''],
      status: [''],
      priority: ['']
    });
      this.loadTasks();

 this.filterForm.get('search')!.valueChanges
      .pipe(
        debounceTime(400),            // 400ms delay
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.loadTasks();
      });

      this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.loadTasks();
      });

  }

  loadTasks() {
    const filters = this.filterForm.value;

    this.taskService.getTasks(filters).subscribe({
      next: (res: any) => {
        this.tasks = res;
      },
      error: (err) => console.error(err)
    });
  }

  getStatusText(status: number) {
    return getStatusText(status);
  }

  getPriorityText(priority: number) {
    return getPriorityText(priority);
  }
}