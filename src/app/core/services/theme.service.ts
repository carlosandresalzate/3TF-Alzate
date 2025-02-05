import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: string = 'light-mode';

  constructor() {
    this.updateHtmlClass();
  }

  // TODO: Hay que agregar comentarios

  /**
   *
   * @param theme
   */
  setTheme(theme: string): void {
    this.currentTheme = theme;
    this.updateHtmlClass();
  }

  /**
   *
   * @returns
   */
  getTheme(): string {
    return this.currentTheme;
  }

  /**
   *
   */
  private updateHtmlClass(): void {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.className = this.currentTheme;
    }
  }
}
