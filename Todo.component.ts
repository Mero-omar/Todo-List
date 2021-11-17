import { Component ,OnInit } from "@angular/core";
import { Todo } from "../models/Todo";
import { HttpClient } from '@angular/common/http';
@Component({
  selector:'app-Todo',
  templateUrl: './Todo.component.html',
  styleUrls:['./Todo.component.css']
})

export class TodosComponent implements OnInit{
    todos: Todo[] = [];
    inputTodo:string="";
    constructor(private http:HttpClient){
      
    }

    ngOnInit():void{
        this.http.get<any>('http://localhost:8888/api/todos').subscribe(data => {
            console.log(data)
            this.todos=data
            
        })
        
    }
     
    toggleDone(id: number){
        this.todos.map((v,i)=>{
            if(i==id) v.completed=!v.completed
            return v;
        })
    }

    deleteTodo(id:number){
        
        this.http.delete<any>("http://localhost:8888/api/todos/${id}").subscribe(data => {
            this.todos=this.todos.filter((v,i)=>i!==id);
        })
    }


    addTodo(){
        const Todotitle=this.inputTodo
        this.http.post<any>("http://localhost:8888/api/todos",{title:Todotitle,completed:false}).subscribe(data => {
            console.log(data)
            this.todos.push(data);
            this.inputTodo="";
        })
    }
}