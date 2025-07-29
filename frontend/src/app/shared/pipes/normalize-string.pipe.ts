import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'normalizeString'
})
export class NormalizeStringPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return value;
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/ç/g, 'c')
            .replace(/Ç/g, 'C');
    }
}
