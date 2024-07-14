import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodosService, Item } from './service/todo.service';
import { ItemComponent } from "./item/item.component";


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule, 
    ItemComponent],
})


export class AppComponent implements OnInit {
  componentTitle = "My To Do List";

  filter: "all" | "active" | "done" = "all";

  allItems: Item[] = [];

  // allItems = [
  //   { description: "eat", done: true },
  //   { description: "sleep", done: false },
  //   { description: "play", done: false },
  //   { description: "laugh", done: false },
  // ];

  constructor( 
    private todosService: TodosService
  ) {}

  ngOnInit() {
    this.todosService.getTodos().subscribe(todos => {
      this.allItems = todos;
    });
  }

  get items(): Item[] {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter((item: Item) =>
      this.filter === "done" ? item.done : !item.done
    );
  }

  addItem(description: string) {
    if (!description) return;
  
    const newItem: Item = { description, done: false };
    this.todosService.addTodo(newItem);
  }

  remove(item: Item) {
    if (item.id) {
      this.todosService.deleteTodo(item.id);
    }
  }  

  updateStatus(item: Item) {
    if (item.id) {
      this.todosService.updateTodoStatus(item.id, !item.done);
    }
  }
}
