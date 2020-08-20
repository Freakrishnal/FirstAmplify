import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Restaurant } from './types/restaurant';
import {APIService} from './API.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public createForm: FormGroup;
  restaurants: Array<Restaurant>;
  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'city': ['', Validators.required]
    });
  } 

  public onCreate(restaurant: any) {
    this.api.CreateRestaurant(restaurant).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });

    this.api.ListRestaurants().then(event => {
      this.restaurants = event.items;
    });

    // this.api.OnCreateRestaurantListener.subscribe( (event: any) => {
    //   const newRestaurant = event.value.data.onCreateRestaurant;
    //   this.restaurants = [newRestaurant, ...this.restaurants];
    // });
  }
}
