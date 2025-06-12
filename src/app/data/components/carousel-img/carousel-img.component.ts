import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { IDpImage } from '../../../interface/IDpImage';
import { ImagesRepositoryService } from '../../../repositories/images-repository.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { TuiAvatar, TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';

@Component({
  selector: 'app-carousel-img',
  imports: [
    CommonModule,
    AsyncPipe,
    TuiAmountPipe,
    TuiAvatar,
    TuiButton,
    TuiCarousel,
    TuiPagination,
    TuiLoader
  ],
  templateUrl: './carousel-img.component.html',
  styleUrls: ['./carousel-img.component.css',
    '../../../styles/root.css',],
})
export class CarouselImgComponent implements OnInit {
  @Input() images: IDpImage[] = [];
  @Output() imageClick = new EventEmitter<SafeUrl>();
  imageUrls: { [key: number]: SafeUrl } = {};
  index = 0;

  constructor(
    private imagesRepository: ImagesRepositoryService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadImageUrls();
  }
  
 ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.loadImageUrls();
    }
  }
  private loadImageUrls(): void {
      this.imageUrls = {};
       if (!this.images || this.images.length === 0) {
      this.cd.detectChanges();
      return;
    }
    let loaded = 0;
    this.images.forEach(image => {
      this.imagesRepository.getDpImageData(image.dpImagesId).subscribe(blob => {
        const url = URL.createObjectURL(blob);
        this.imageUrls[image.dpImagesId] = this.sanitizer.bypassSecurityTrustUrl(url);
        loaded++;
        if (loaded === this.images.length) {
          this.cd.detectChanges();
        }
      });
    });
  }

  onImageClick(imageUrl: SafeUrl): void {
    this.imageClick.emit(imageUrl);
  }
}