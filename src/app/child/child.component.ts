import { Component, OnInit } from '@angular/core';
import { Child } from '../models/child';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  public childArray:Child[] = [];
  public child:Child;
  public childToAdd:Child = new Child();
  public dateNewChildCreated = new Date();

  constructor(private _childService: ChildService) { }
  
  ngOnInit() {
    //this.getChildsPromise(); 
    this.getChildsObservable();
    //this.getChild(42);
  }
  
  getChildsPromise(): void {
    this._childService.getChildsPromise()
    .then(data => this.childArray = data);
  }
  
  getChildsObservable(): void {
    this._childService.getChildsObservable()
      .subscribe(
        data => {this.childArray= data},
        error => console.log(error)
      );
  }

  getChild(id): void {
    this._childService.getChild(id)
    .subscribe(
      data => this.child= data,
      error => console.log(error)
    );
  }

  onAddClicked(child): void {
    this._childService.addChild(child)
    .subscribe(
      data => { this.child= data; 
                this.childToAdd = new Child();
                this.getChildsObservable();
              },
      error => console.log(error)
    );
  }

  onSaveChangesClicked(id, child): void {
    this._childService.updateChild(id, child)
    .subscribe(
      data => { this.child= data; 
                this.getChildsObservable();
              },
      error => console.log(error)
    );
  }

  onDeleteClicked(id): void {
    this._childService.deleteChild(id)
    .subscribe(
      data => { this.child= data; 
                this.getChildsObservable();
              },
      error => console.log(error)
    );
    //alert("Are you sure you want to delete this child?" + id);
  }

  isSanta(id, child): boolean {
    if ( child.email == "santa@np.com"){
      return true;
    }
    return false;
  }
   
}

