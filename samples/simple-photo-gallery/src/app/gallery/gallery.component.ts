import { Component, OnInit, inject } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  standalone: true, 
  selector: 'app-gallery',
  template: `
    <div class="gallery-container">
      <h2>Photo Gallery</h2>
      <div class="gallery">
        <div *ngFor="let photo of photos" class="gallery-item" (click)="viewPhoto(photo)">
          <img [src]="photo.thumbnailUrl" [alt]="photo.title">
          <p>{{ photo.title }}</p>
        </div>
      </div>

      <div *ngIf="selectedPhoto" class="photo-modal">
        <span class="close" (click)="closeModal()">&times;</span>
        <img [src]="selectedPhoto.url" [alt]="selectedPhoto.title">
        <p>{{ selectedPhoto.title }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  photos: any[] = [];
  selectedPhoto: any = null;
  private photoService = inject(PhotoService);

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(data => {
      this.photos = data;
    });
  }

  viewPhoto(photo: any): void {
    this.selectedPhoto = photo;
  }

  closeModal(): void {
    this.selectedPhoto = null;
  }
}
