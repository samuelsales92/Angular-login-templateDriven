import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../../../layouts/components/sidebar/sidebar.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
