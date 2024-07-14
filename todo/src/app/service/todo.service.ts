import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item {
  id?: string;
  description: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  private firestoreCollection : AngularFirestoreCollection<Item>;
  todoDoc!: AngularFirestoreDocument<Item>;

  constructor(private firestore: AngularFirestore) { 
    this.firestoreCollection = firestore.collection<Item>('ListToDo');
  }

  addTodo(ListToDo: Item){
    this.firestoreCollection.add(ListToDo);
  }

  updateTodoStatus(id:string, newStatus:boolean){
    this.firestoreCollection.doc(id).update({done: newStatus});
  }

  deleteTodo(id:string){
    this.firestoreCollection.doc(id).delete();
  }

  updateTodo(id: string, newDescription: string) {
   this.firestoreCollection.doc(id).update({description: newDescription});
  }

  getTodos(): Observable<Item[]> {
    return this.firestoreCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Item;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
