import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models/student';
import { getNormalizedFullName } from '../utils/string-utils';

@Pipe({
  name: 'fullName',
  standalone: false,
})
export class FullNamePipe implements PipeTransform {
  transform(student: Student): string {
    return getNormalizedFullName(student);
  }
}
