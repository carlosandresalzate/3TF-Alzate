import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

/**
 * @description Directiva para aplicar un tamaño de fuente de 20px a los elementos.
 * Se utilieza para cabeceras, o titulos.
 *
 * @example
 * <h1 appTitleFonts>Este titulo tendra un font-size de 20px</h1>
 */
@Directive({
  selector: '[appTitleFont]',
  standalone: false,
})
export class TitleFontDirective implements OnInit {
  /**
   * Contructor de la directiva
   * @param {ElementRef} el - referencia al elemento DOM al que se aplica la directiva.
   * @param {Renderer2} renderer - Servicio que permite manupular el DOM de
   * forma segura.
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  /**
   * Metodo que se ejecuta al inicializar la directiva.
   * Se utiliza para aplicar el estilo de fuente deseado.
   *
   */
  ngOnInit(): void {
    // ? https://angular.dev/api/core/Renderer2
    // se aplica un estilo CSS para establecer la propiedad font-size a 20px
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '20px');
  }
}
