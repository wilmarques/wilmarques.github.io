import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeroesVisualizerComponent } from './heroes-visualizer.component';

@NgModule({
  declarations: [HeroesVisualizerComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  entryComponents: [HeroesVisualizerComponent],
})
export class HeroesVisualizerModule { }
