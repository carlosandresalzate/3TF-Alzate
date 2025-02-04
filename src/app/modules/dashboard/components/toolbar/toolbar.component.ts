import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: false,

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  // envia un evento al componete padre
  @Output() toggleDrawer = new EventEmitter<void>();

  // defino la propiedad isChecked:boolean
  isChecked: boolean = false;

  // defino el theme light | dark
  themeSelected: string = 'Light';

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    const newTheme = this.isChecked ? 'dark-mode' : 'light-mode';
    this.themeSelected = this.isChecked ? 'Dark' : 'Light';
    this.themeService.setTheme(newTheme);
  }
}
