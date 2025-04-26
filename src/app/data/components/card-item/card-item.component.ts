import { Component, Input } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-card-item',
  imports: [CommonModule,
    TuiAppearance,
    TuiButton,
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

@Input() productInfo!: IDpProduct;

}
