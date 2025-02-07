import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleFontDirective } from './directives/title-font.directive';

/**
 * @description Modulo Compartido que agrega y exporta componentes, directivas y pipes reutilizables.
 */
@NgModule({
  declarations: [FullNamePipe, TitleFontDirective],
  imports: [CommonModule],
  exports: [FullNamePipe, TitleFontDirective],
})
export class SharedModule {}
