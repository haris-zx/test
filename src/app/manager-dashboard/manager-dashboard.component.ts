import { Component } from '@angular/core';
import { getPriorityText, getStatusText, Task } from '../dto/CreateTaskDto';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
      CommonModule,
      ReactiveFormsModule,NgbModule,FormsModule
    ],  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {

   filterForm!: FormGroup;
    tasks: Task[] = [];
    loading = false;
   orgId: number | undefined;
    
  
    
  
    constructor(
      private fb: FormBuilder,
      private taskService: TaskService
    ) {}
  
    ngOnInit(): void {
       this.orgId = Number(localStorage.getItem('orgId'));
      this.filterForm = this.fb.group({
        search: [''],
        status: [''],
        priority: ['']
      });
   this.filterForm.get('search')!.valueChanges
        .pipe(
          debounceTime(400),            
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.loadTasks();
        });
    this.loadTasks();

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
    this.loading = true;

    this.taskService.getManagerTasks(this.orgId!, filters).subscribe({
      next: (res: Task[]) => {
        this.tasks = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
    getStatusText(status: number) {
      return getStatusText(status);
    }
  
    getPriorityText(priority: number) {
      return getPriorityText(priority);
    }
  }


