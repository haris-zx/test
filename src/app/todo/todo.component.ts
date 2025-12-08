import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskDto, getPriorityText, getStatusText, Task } from '../dto/CreateTaskDto';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo',
   standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,NgbModule,FormsModule
  ],
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
//  tasks: Task[] = [];
  taskForm!: FormGroup;
  showForm: boolean = false; // <- toggle visibility
  orginzationId: number | undefined;
ownerId: number=1;
tasks: Task[] = [];


  constructor(private fb: FormBuilder,private taskService:TaskService) {
   
  }


  ngOnInit() {
     this.orginzationId = Number(localStorage.getItem('orgId'));
  this.ownerId = Number(localStorage.getItem('Id'));
   this.taskForm = this.fb.group({
      orgId: [this.orginzationId, Validators.required], 
      ownerId: [this.ownerId, Validators.required], 
      title: ['', Validators.required],
      status: [0, Validators.required],
      priority: [1, Validators.required],
      tags: [''],
      dueDate: ['']
    });

    this.getUserData()
  }
createTask() {
  console.log(this.taskForm.value)
    if (this.taskForm.invalid) return;

    const task: CreateTaskDto = this.taskForm.value;
    this.taskService.createTask(task).subscribe((res) => {
      // this.tasks.push(res);
      console.log(res)
    });
    this.showForm = false
  }
 
    getUserData() {
  this.taskService.getTaskById(this.ownerId).subscribe({
    next: (res: Task[]) => {
      console.log(res);
      this.tasks = res;
    },
    error: (err) => console.log(err)
  });
}

getStatusName(status: number) {
    return getStatusText(status);
  }

  getPriorityName(priority: number) {
    return getPriorityText(priority);
  }
}
