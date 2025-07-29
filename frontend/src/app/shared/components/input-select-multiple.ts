import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';

@Component({
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    selector: 'app-input-select-multiple',
    template: `
        <!-- <p-multiSelect
  formControlName="produtos"
  [options]="produtos"
  optionLabel="nome"
  optionValue="id"
  placeholder="Selecione os produtos"
  display="chip"
  [filter]="true"
></p-multiSelect> -->
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSelectMultipleComponent),
            multi: true
        }
    ],
    styles: [
        `
            .multi-select-field {
                width: 100%;
            }
        `
    ]
})
export class InputSelectMultipleComponent implements ControlValueAccessor, OnChanges {
    @Input() label!: string;
    @Input() placeholder = '';
    @Input() options: any[] = [];
    @Input() optionLabel = 'nome';
    @Input() optionValue = 'id';

    @Output() optionSelected = new EventEmitter<any[]>();

    inputControl = new FormControl('');
    filteredOptions: any[] = [];
    selectedOptions: any[] = [];

    private onChange = (_: any) => {};
    onTouched = () => {};

    ngOnChanges(): void {
        this.filteredOptions = this.options;
    }

    constructor() {
        this.inputControl.valueChanges.subscribe((value) => {
            const inputValue = typeof value === 'string' ? value.toLowerCase() : '';
            this.filteredOptions = this.options.filter((option) => this.getOptionLabel(option).toLowerCase().includes(inputValue) && !this.selectedOptions.some((sel) => sel[this.optionValue] === option[this.optionValue]));
        });
    }

    writeValue(values: any[]): void {
        if (Array.isArray(values)) {
            this.selectedOptions = this.options.filter((opt) => values.some((val) => val[this.optionValue] === opt[this.optionValue]));
        } else {
            this.selectedOptions = [];
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    getOptionLabel(option: any): string {
        return option ? option[this.optionLabel] : '';
    }

    onOptionSelected(option: any): void {
        if (!this.selectedOptions.some((sel) => sel[this.optionValue] === option[this.optionValue])) {
            this.selectedOptions.push(option);
            this.emitChanges();
        }
        this.inputControl.setValue('');
    }

    removeOption(option: any): void {
        this.selectedOptions = this.selectedOptions.filter((sel) => sel[this.optionValue] !== option[this.optionValue]);
        this.emitChanges();
    }

    private emitChanges(): void {
        this.onChange(this.selectedOptions);
        this.optionSelected.emit(this.selectedOptions);
    }
}
