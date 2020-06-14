import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'hv-heroes-visualizer',
  template: `
    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        <span class="badge">{{hero.id}}</span>
        <span class="hero-name">{{ hero }}</span>
        <button class="delete" title="delete hero"
          (click)="delete(hero)">x</button>
      </li>
    </ul>
  `,
  styles: [`
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      position: relative;
      cursor: pointer;
      background-color: #EEE;
      margin: .5em;
      padding: .5em 0 .3em 1em;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }

    .heroes span.hero-name {
      color: #333;
      position: relative;
      display: block;
      width: 250px;
    }
    .heroes span.hero-name:hover {
      color:#607D8B;
    }

    button {
      background-color: #eee;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      cursor: hand;
      font-family: Arial;
    }
    button.delete {
      position: relative;
      left: 174px;
      top: -23px;
      background-color: gray !important;
      color: white;
    }
  `]
})
export class HeroesVisualizerComponent {

  @Input() heroes: Array<string>;

  @Output() deleteHero = new EventEmitter<string>();

  delete(heroName: string): void {
    if (heroName) {
      this.deleteHero.emit(heroName);
    }
  }

}
