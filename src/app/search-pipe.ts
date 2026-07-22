import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(products: any[], searchTerm: string): any[] {
    if (!products || !searchTerm) {
      return products; // Return original array if no search term or products
    }
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}