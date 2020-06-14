import { Component, Injector, OnInit } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { HeroesVisualizerComponent } from 'heroes-visualizer';

@Component({
  selector: 'hc-root',
  template: `
    <h1>My Heroes</h1>
    <hc-creator (newHero)="addHero($event)"></hc-creator>
    <hvce-heroes-visualizer [heroes]="heroes" (deleteHero)="deleteHero($event.detail)"></hvce-heroes-visualizer>
  `,
})
export class AppComponent implements OnInit {

  heroes: Array<string> = [];

  constructor(
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const HeroesVisualizerElementDefinition = createCustomElement(
      HeroesVisualizerComponent,
      { injector: this.injector },
    );
    customElements.define('hvce-heroes-visualizer', HeroesVisualizerElementDefinition);
  }

  addHero(newHero: string): void {
    this.heroes = [
      ...this.heroes,
      newHero,
    ];
  }

  deleteHero(heroToDelete: string): void {
    this.heroes = this.heroes.filter((hero: string) => {
      return hero !== heroToDelete;
    });
  }

}
