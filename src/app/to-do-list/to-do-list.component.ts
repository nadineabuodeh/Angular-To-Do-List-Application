import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Todo, TodoService } from '../to-do.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class TodoListComponent implements OnInit {

  todoForm: FormGroup;
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  activeTab: string = 'allTasks';

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todos = this.todoService.getTask();
    this.filteredTodos = this.todos;
  }

  addTask(): void {
    if (this.todoForm.valid) {
      const title = this.todoForm.get('title')?.value;
      const id = 0;
      this.todoService.addTask(title, id);
      this.todoForm.reset();
      this.loadTasks();
    } else {
      alert('Please enter a task');
    }
  }

  deleteTask(i: number, event: MouseEvent): void {
    if (confirm('Are you sure to delete this task?') && ((event.target as HTMLElement).tagName === 'BUTTON')) {
      this.todoService.deleteTask(i);
      this.loadTasks();
    }
  }

  isComplete(i: number): void {
    this.todoService.isComplete(i);
    this.loadTasks();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'searchTasks') {
      this.filteredTodos = this.todos;
    }
  }

  searchTasks(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredTodos = this.todos.filter(todo => todo.title.toLowerCase().includes(query));
  }

  editTask(i: number): void {
    this.todos[i].isEditing = true;
    this.todos[i].editTitle = this.todos[i].title;
  }

  saveTask(i: number): void {
    this.todos[i].title = this.todos[i].editTitle!;
    this.todos[i].isEditing = false;
    this.todoService.saveTasks();
    this.loadTasks();
  }

  cancelEdit(i: number): void {
    this.todos[i].isEditing = false;
  }
}
