import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskDto, Task } from './dto/CreateTaskDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7063/api/Task';

  constructor(private http:HttpClient) { }


    createTask(task: CreateTaskDto): Observable<Task> {
      debugger;
    return this.http.post<Task>('https://localhost:7063/api/Task/create', task);
  }

    getTasks(filters: any): Observable<Task[]> {
      debugger;
    let params = new HttpParams();

    if (filters.status !== null && filters.status !== '')
      params = params.set('status', filters.status);

    if (filters.priority !== null && filters.priority !== '')
      params = params.set('priority', filters.priority);

    if (filters.tags)
      params = params.set('tags', filters.tags);

    if (filters.search)
      params = params.set('search', filters.search);

    return this.http.get<Task[]>("https://localhost:7063/api/Task", { params });
  }

    getManagerTasks(orgId: number, filters: any) {

      debugger
    const params = {
      orgId: orgId,
      status: filters.status?.toString() || '',
      priority: filters.priority?.toString() || '',
      search: filters.search || ''
    };

    return this.http.get<Task[]>(`${this.baseUrl}/manager`, { params });
  }

getTaskById(id: number): Observable<Task[]> {  
  debugger;   
  return this.http.get<Task[]>(`${this.baseUrl}/${id}`);
  }
}
