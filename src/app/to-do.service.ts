import { Injectable } from '@angular/core';

export interface Todo {
  title: string;
  id: number;
  isComplete: boolean;
  isEditing?: boolean; 
  editTitle?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];

  constructor() {
    this.loadTasks();
  }

  public saveTasks(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadTasks(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  getTask(): Todo[] {
    return this.todos;
  }

  addTask(title: string, id: number): void {
    this.todos.push({ title, id, isComplete: false });
    this.saveTasks();
  }

  deleteTask(i: number): void {
    this.todos.splice(i, 1);
    this.saveTasks();
  }

  isComplete(i: number): void {
    this.todos[i].isComplete = !this.todos[i].isComplete;
    this.saveTasks();
  }
}
