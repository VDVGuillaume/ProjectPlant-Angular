import { Pipe, PipeTransform } from '@angular/core';
import { Plant } from './plant.model';

@Pipe({
  name: 'plantFilter'
})
export class PlantFilterPipe implements PipeTransform {

  transform(plants: Plant[], name: string): Plant[] {
    if(!name || name.length === 0){
      return plants;
    }
    return plants.filter(p => p.name.toLowerCase().startsWith(name.toLowerCase())
    );

  }

}
