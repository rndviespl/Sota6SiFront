import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDataListWrapper } from '@taiga-ui/kit';
import {TuiInputModule} from '@taiga-ui/legacy';

@Component({
  selector: 'app-filter-by-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiDataListWrapper,
    TuiInputModule
  ],
  templateUrl: './filter-by-input.component.html',
  styleUrls: ['./filter-by-input.component.css',
    '../../../styles/root.css',],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterByInputComponent),
      multi: true
    }
  ]
})
export class FilterByInputComponent implements ControlValueAccessor {
  @Input() label: string = 'Search';
  @Input() items: string[] = [];
  @Output() searchQuery = new EventEmitter<string>();

  form = new FormGroup({
    search: new FormControl('', [Validators.pattern('^[a-zA-Zа-яА-Я0-9]*$')]),
  });

  private innerValue: string = '';

  get filteredItems() {
    const value = this.form.get('search')?.value ?? '';
    this.searchQuery.emit(value);
    return this.items.filter(item => item.includes(value));
  }

  constructor() {
    this.form.controls['search'].valueChanges.subscribe(value => {
      const safeValue = value ?? '';
      this.searchQuery.emit(safeValue);
      this.onChange(safeValue);
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    const inputChar = event.key;
    const allowedChars = /^[a-zA-Zа-яА-Я0-9]$/;
    if (!allowedChars.test(inputChar) && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
    }
  }

  writeValue(value: string): void {
    this.innerValue = value;
    this.form.controls['search'].setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {};
}
