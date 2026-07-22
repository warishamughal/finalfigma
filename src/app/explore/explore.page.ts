import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonIcon, 
  IonItem, IonLabel, IonList, IonAccordion, IonAccordionGroup, IonBadge, 
  IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonChip
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  add, addOutline, arrowBackOutline, bagHandleOutline, cartOutline, 
  compassOutline, heart, heartOutline, locationOutline, optionsOutline, 
  person, removeOutline, shareOutline, star
} from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchPipe } from '../search-pipe'; 
import { Data } from '../data';
import { Global } from '../global';
import { Product } from '../interfaces'; // ✅
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonButton, IonIcon, 
    IonItem, IonLabel, IonList, IonAccordion, IonAccordionGroup, IonBadge, 
    IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonChip,
    CommonModule, FormsModule, SearchPipe, FooterComponent
  ]
})
export class ExplorePage implements OnInit {
  allExplore: Product[] = [];       // ✅
  filteredProducts: Product[] = []; // ✅
  product: Product[] = [];          // ✅
  product4: Product[] = [];         // ✅
  activeChip: string = 'See All';
  searchTerm: string = '';
  loadIndex: number = 7;

  favProducts = this.global.favProducts;
  favCount = this.global.favCount;
  cartCount = this.global.cartCount;

  activePage: string = 'explore';
  currentActiveIndex: number = 2;
  navItems = ['shop', 'cart', 'explore', 'favorites', 'profile'];

  constructor(
    private router: Router, 
    private data: Data, 
    private route: ActivatedRoute,
    public global: Global 
  ) {
    addIcons({ 
      optionsOutline, add, addOutline, arrowBackOutline, heart,
      heartOutline, locationOutline, person, removeOutline, 
      shareOutline, star, compassOutline, bagHandleOutline, cartOutline 
    });
  }

  ngOnInit() {
    this.allExplore = this.data.getexploreProducts();
    this.product4 = this.allExplore.slice(0, 7);
    this.loadIndex = 7;
    this.loadNextProducts();

    this.route.queryParams.subscribe(params => {
      const categories = params['categories'] ? JSON.parse(params['categories']) : [];
      const prices = params['prices'] ? JSON.parse(params['prices']) : [];
      if (categories.length === 0 || prices.length === 0) {
        this.filteredProducts = [];
        return;
      }
      this.filteredProducts = this.allExplore.filter(p => {
        const catMatch = categories.includes(p.category);
        const priceMatch = prices.includes(p.price + '$');
        return catMatch && priceMatch;
      });
    });

    this.selectCategory({ name: 'See All' });
  }

  ionViewWillEnter() {}

  toggleFav(item: Product) { // ✅
    this.global.toggleFav(item);
  }

  openProduct(item: Product) { // ✅
    this.global.setProduct(item);
    this.router.navigate(['/productdetail']);
  }

  loadMore(event: any) {
    this.loadNextProducts();
    setTimeout(() => {
      event.target.complete();
      if (this.loadIndex >= this.allExplore.length) event.target.disabled = true;
    }, 500);
  }

  private loadNextProducts() {
    const nextBatch = this.allExplore.slice(this.loadIndex, this.loadIndex + 10);
    if (nextBatch.length > 0) {
      this.product = [...this.product, ...nextBatch];
      if (this.activeChip === 'See All') {
        this.filteredProducts = [...this.allExplore.slice(7)];
      } else {
        this.filteredProducts = this.allExplore.filter(p => p.category === this.activeChip);
      }
      this.loadIndex += 10;
    }
  }

  selectCategory(chip: any) {
    this.activeChip = chip.name;
    if (chip.name === 'See All') {
      this.filteredProducts = [...this.allExplore.slice(7)];
    } else {
      this.filteredProducts = this.allExplore.filter(p => p.category === chip.name);
    }
    this.searchTerm = '';
  }

  onSearch(event: any) { this.searchTerm = event.target.value || ''; }

  setActive(page: string) {
    const clickedIndex = this.navItems.indexOf(page);
    const clickedItem = document.querySelector(`.nav-item.${page}`);
    const isMovingRight = clickedIndex > this.currentActiveIndex;
    const isMovingLeft = clickedIndex < this.currentActiveIndex;
    if (isMovingRight && clickedItem) {
      clickedItem.classList.add('moving-right');
      setTimeout(() => clickedItem.classList.remove('moving-right'), 600);
    }
    if (isMovingLeft && clickedItem) {
      clickedItem.classList.add('moving-left');
      setTimeout(() => clickedItem.classList.remove('moving-left'), 600);
    }
    if (clickedItem) {
      clickedItem.classList.add('wave-effect');
      setTimeout(() => clickedItem.classList.remove('wave-effect'), 600);
    }
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (clickedItem) clickedItem.classList.add('active');
    this.currentActiveIndex = clickedIndex;
    this.activePage = page;
  }

  go() { this.router.navigate(['./homescr']); }
  cart() { this.router.navigate(['./my-cart']); }
  expo() { this.router.navigate(['./explore']); }
  fvrt() { this.router.navigate(['./fav']); }
  pro() { this.router.navigate(['./account']); }
  option() { this.router.navigate(['/filters']); }
}