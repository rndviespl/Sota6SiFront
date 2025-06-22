import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { TuiAlertService, TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { switchMap, takeUntil } from 'rxjs';
import { Router,  } from '@angular/router';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { AlertDeleteComponent } from '../alert-delete/alert-delete.component';
import { CommonModule } from '@angular/common';
import { ICartItem } from '../../../interface/ICartItem';

/**
 * @ignore
 */
@Component({
  selector: 'app-icon-trash',
  imports: [ CommonModule,
    TuiIcon, TuiIconPipe,],
  templateUrl: './icon-trash.component.html',
  styleUrls: ['./icon-trash.component.css', 
    '../../../styles/root.css',],
})
export class IconTrashComponent {
  @Input() item!: ICartItem;
  

  @Output() responseAlert = new EventEmitter<boolean>();
  constructor(
    private alerts: TuiAlertService,
    private router: Router,
  ) { }

  protected showNotification(): void {
    const notification = this.alerts
      .open<boolean>(new PolymorpheusComponent(AlertDeleteComponent), {
        label: 'Вы уверены, что хотите удалить?',
        appearance: 'negative',
        autoClose: 0,
      })
      .pipe(
        switchMap((response) => {
          if (response) {
            this.responseAlert.emit(true);
            console.log(`Удаление товара: ${this.item.productId}`);
            return this.alerts.open(`Товар "${this.item.productId}" удален.`, { label: 'Успех' });
          } else {
            return this.alerts.open(`Удаление товара "${this.item.productId}" отменено.`, { label: 'Информация' });
          }
        }),
        takeUntil(this.router.events),
      );
    notification.subscribe();
  }
}
