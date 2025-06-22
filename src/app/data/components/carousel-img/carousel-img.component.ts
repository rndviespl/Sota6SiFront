import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { IDpImage } from '../../../interface/IDpImage';
import { ImagesRepositoryService } from '../../../repositories/images-repository.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TuiButton, TuiLoader } from '@taiga-ui/core';
import { TuiAvatar, TuiCarousel, TuiPagination } from '@taiga-ui/kit';
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { Subscription, forkJoin, map } from 'rxjs';

/**
 * @ignore
 */
@Component({
  selector: 'app-carousel-img',
  standalone: true,
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
  styleUrls: [
    './carousel-img.component.css',
    '../../../styles/root.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselImgComponent implements OnInit, OnDestroy {
  @Input() images: IDpImage[] = [];
  @Output() imageClick = new EventEmitter<SafeUrl>();
  imageUrls: { [key: number]: SafeUrl } = {};
  index = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private imagesRepository: ImagesRepositoryService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadImageUrls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images'] && !changes['images'].firstChange) {
      this.loadImageUrls();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    Object.values(this.imageUrls).forEach(url => {
      if (typeof url === 'string') {
        URL.revokeObjectURL(url);
      }
    });
  }

  private loadImageUrls(): void {
    if (!this.images || this.images.length === 0) {
      this.imageUrls = {};
      this.cd.markForCheck();
      return;
    }

    const newImages = this.images.filter(image => !this.imageUrls[image.dpImagesId]);
    if (newImages.length === 0) {
      this.cd.markForCheck();
      return;
    }

    const imageRequests = newImages.map(image =>
      this.imagesRepository.getDpImageData(image.dpImagesId).pipe(
        map(blob => ({ id: image.dpImagesId, blob }))
      )
    );

    this.subscriptions.add(
      forkJoin(imageRequests).subscribe(results => {
        results.forEach(({ id, blob }) => {
          const url = URL.createObjectURL(blob);
          this.imageUrls[id] = this.sanitizer.bypassSecurityTrustUrl(url);
        });
        this.cd.markForCheck();
      })
    );
  }

  onImageClick(imageUrl: SafeUrl): void {
    this.imageClick.emit(imageUrl);
  }
}