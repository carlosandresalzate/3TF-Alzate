import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

/**
 * Este servicio gestiona la paleta de colores de la UI (tema claro, tema
 * oscuro, y/o necesarios.) de la aplicacion. Modifica la clase de la etiqueta * <html> para reflejar el tema actual.
 *
 */
/**
 * definicion de type Theme para exportar
 * @type {Theme} 'dark' | 'light'
 */
export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * manipulacion del DOM
   * @private
   * @readonly
   */
  private readonly document = inject(DOCUMENT);

  /**
   * definicion del tema actual usando señales(Signals)
   * Esta propiedad debe tener un valor de inicio 'dark-mode' | 'light-mode'
   * TODO: esto tiene que agregarse en las configuraciones de usuario
   * @readonly
   */
  private currentTheme: string = 'light-mode';

  /**
   * Inicializo el tema de color en light-mode por defecto y actualizo
   * el DOM para que cargue el tema actual
   */
  constructor() {
    // this.currentTheme;
    this.updateHtmlClass();
  }

  /**
   *
   * @param {theme} Theme - Recibe el valor 'dark' | 'light' para definir el
   * tema a usar.
   */
  setTheme(theme: Theme) {
    this.currentTheme = `${theme}-mode`;
    this.updateHtmlClass();
  }

  getCurrentTheme(): Theme {
    return this.currentTheme === 'dark-mode' ? 'dark' : 'light';
  }

  /**
   * Actualiza la clase del elemento <html> en el DOM segun el tema actual.
   * Si encuentra el elemento <html>, le asigna la clase correspondiente
   * (alamacenda en `currentTheme`), lo que permite aplicar estilos
   * globales en funcion del tema.
   *
   * @private
   * @returns {void} No retorna nada; simplemente modifica la clase del
   * elemento <html>
   */
  private updateHtmlClass(): void {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      console.log(htmlElement);
      htmlElement.className = this.currentTheme;
    }
  }
}
