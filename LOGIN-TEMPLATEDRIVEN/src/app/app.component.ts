import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'LOGIN-TEMPLATEDRIVEN';


  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
      this.primeng.ripple.set(true);
  }
}
