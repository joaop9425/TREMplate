import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mask'
})
export class MaskPipe implements PipeTransform {
    transform(value: string | number | null | undefined, type: 'cpf' | 'cnpj' | 'telefone' | 'cep' | 'cpfCnpj'): string {
        if (!value) {
            return '';
        }

        let str = value.toString().replace(/\D/g, '');
        console.log('str input -> ', str);

        // Decide só no primeiro momento
        if (type === 'cpfCnpj') {
            if (str.length > 11) {
                type = 'cnpj';
            } else {
                type = 'cpf';
            }
        }

        // Limita tamanho máximo
        const maxLengthByType = {
            cpf: 11,
            cnpj: 14,
            telefone: 11,
            cep: 8
        };

        if (type in maxLengthByType) {
            str = str.substring(0, maxLengthByType[type]);
        }

        switch (type) {
            case 'cpf':
                if (str.length <= 3) {
                    str = str;
                } else if (str.length <= 6) {
                    str = str.replace(/^(\d{3})(\d{1,3})/, '$1.$2');
                } else if (str.length <= 9) {
                    str = str.replace(/^(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
                } else {
                    str = str.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                }
                break;

            case 'cnpj':
                if (str.length <= 2) {
                    str = str;
                } else if (str.length <= 5) {
                    str = str.replace(/^(\d{2})(\d{1,3})/, '$1.$2');
                } else if (str.length <= 8) {
                    str = str.replace(/^(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
                } else if (str.length <= 12) {
                    str = str.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
                } else {
                    str = str.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
                }
                break;

            case 'telefone':
                if (str.length <= 2) {
                    str = str;
                } else if (str.length <= 6) {
                    str = str.replace(/^(\d{2})(\d{1,4})/, '($1) $2');
                } else if (str.length <= 10) {
                    str = str.replace(/^(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
                } else {
                    str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                }
                break;

            case 'cep':
                if (str.length <= 5) {
                    str = str;
                } else {
                    str = str.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
                }
                break;
        }

        console.log('str return -> ', str);
        return str;
    }
}
