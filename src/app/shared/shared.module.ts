import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleFontDirective } from './directives/title-font.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * @description Modulo Compartido que agrega y exporta componentes, directivas y pipes reutilizables.
 */
@NgModule({
  declarations: [FullNamePipe, TitleFontDirective],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    TitleFontDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SharedModule {}
