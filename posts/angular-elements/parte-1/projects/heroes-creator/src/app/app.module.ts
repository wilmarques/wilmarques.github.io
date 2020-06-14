import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreatorComponent } from './creator.component';

import { HeroesVisualizerModule } from 'heroes-visualizer';

@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroesVisualizerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
