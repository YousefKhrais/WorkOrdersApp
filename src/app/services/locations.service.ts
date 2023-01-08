import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor() { }

  // This function is used to get all the locations. (Mock data)
  getLocations() {
    return [
      { id: 1, name: 'Location 1' },
      { id: 2, name: 'Location 2' },
      { id: 3, name: 'Location 3' },
      { id: 4, name: 'Location 4' },
      { id: 5, name: 'Location 5' },
    ]
  }

  getLocation(id: number) {
    return this.getLocations().find(location => location.id == id);
  }
}
