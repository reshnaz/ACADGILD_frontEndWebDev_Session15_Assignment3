import { Component, OnInit } from '@angular/core';
import { PersonList } from './../interface/person-model';
import { PostService } from "./../service/post.service";
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

// This header will be passed along with URL
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  /* Animations that are triggered when person data is added 
  and it the same is displayed in the table. The table row glides in from top. */
  animations: [
    trigger('displayPerson', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate(500)
      ]),
    ])
  ]
})

export class PersonComponent implements OnInit {


  // Array of interface -- stores all persons' details
  personList: Observable<PersonList[]>;

  // String to search with.
  private searchString: string;

  // Using constructor, declare the PostService
  constructor(private _postService: PostService, private http: HttpClient) { }

  ngOnInit() {
    this.searchString = '';
    // Service function called to return updated person array.
    this.fetchDetails();
  }

  private fetchDetails() {
    this.personList = this._postService.getPersons();
  }

  // Calls the service function to delete person of selected id and refreshes view.
  deletePerson(person: PersonList) {
    this._postService.deletePerson(person.id).subscribe();
    this.fetchDetails();
  }

  // Animation Callback functions that display message in console when animation starts and ends.
  animationStarted(event: AnimationEvent) {
    console.warn('Animation started: ', event);
  }

  animationDone(event: AnimationEvent) {
    console.warn('Animation done: ', event);
  }

}
