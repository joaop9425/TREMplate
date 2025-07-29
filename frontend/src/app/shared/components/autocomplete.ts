import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';

@Component({
    selector: 'app-input-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    template: `
        <mat-form-field>
            <mat-label>{{ label }}</mat-label>
            <input type="text" matInput [matAutocomplete]="auto" [placeholder]="placeholder" [value]="getOptionLabel(selectedOption)" (input)="filterOptions($event)" (blur)="onTouched()" />
            <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onOptionSelected($event.option.value)">
                <mat-option *ngFor="let option of filteredOptions" [value]="option">
                    {{ getOptionLabel(option) }}
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSelectComponent),
            multi: true
        }
    ],
    styles: [
        `
            mat-form-field {
                width: 100%;
            }
        `
    ]
})
export class InputSelectComponent implements ControlValueAccessor {
    @Input() label!: string;
    @Input() placeholder = '';
    @Input() options: any[] = [];
    @Input() optionLabel = 'nome'; // default para seu caso
    @Input() optionValue = 'id'; // default para seu caso

    @Output() optionSelected = new EventEmitter<any>();

    filteredOptions: any[] = [];
    selectedOption: any;

    private internalValue: any;

    onChange = (value: any) => {};
    onTouched = () => {};

    ngOnChanges() {
        this.filteredOptions = this.options || [];
        this.setSelectedOption();
    }

    writeValue(value: any): void {
        this.internalValue = value;
        this.setSelectedOption();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private setSelectedOption() {
        if (!this.options || this.options.length === 0) return;

        if (typeof this.internalValue === 'object') {
            this.selectedOption = this.internalValue;
        } else {
            this.selectedOption = this.options.find((opt) => opt[this.optionValue] === this.internalValue) || null;
        }
    }

    getOptionLabel(option: any): string {
        return option ? option[this.optionLabel] : '';
    }

    filterOptions(event: Event): void {
        const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredOptions = this.options.filter((option) => this.getOptionLabel(option).toLowerCase().includes(inputValue));
    }

    onOptionSelected(option: any): void {
        this.selectedOption = option;
        const value = option?.[this.optionValue];
        this.internalValue = value;
        this.onChange(value);

        // Emitir o valor completo da opção selecionada
        this.optionSelected.emit(option);
    }
}
