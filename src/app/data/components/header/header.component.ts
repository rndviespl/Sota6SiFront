import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { tuiDialog } from '@taiga-ui/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [BackButtonComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css',
    '../../../styles/root.css',],
})
export class HeaderComponent implements OnInit {
  @Input() logoUrl: string = 'public/logo__ru.jpg';
  @Input() buttonText: string = '';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() isApiPage: boolean = false;

  constructor(private location: Location, private router: Router) {}

  imageLoaded: boolean = false;

  ngOnInit(): void {
    // const img = new Image();
    // img.src = this.logoUrl;
    // img.onload = () => {
    //   this.imageLoaded = true;
    // };
  }

  onLogoClick(event: Event): void {
    this.router.navigateByUrl('/');
  }
  

  Click(): void {
    this.buttonClick.emit();
  }

}
