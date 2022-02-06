import { Plant } from './plant.model';

const JsonRecipes = [
  {
    name: 'Verbena Bonariensis',   
    dateAdded: '2020-02-07T18:25:43.511Z'
  },
  {
    name: 'Gaura lindheimeri',   
    dateAdded: '2020-02-08T16:25:43.511Z'
 },
 {
  name: 'Peterselie',   
  dateAdded: '2020-02-08T16:25:43.511Z'
  }
];
export const PLANTS: Plant[] = JsonRecipes.map(Plant.fromJSON);