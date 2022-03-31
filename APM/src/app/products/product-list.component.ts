import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './Product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';
    sub!: Subscription;
    
    products: IProduct[] = [];
    filteredProducts: IProduct[] = [];

    private _listFilter: string = '';
    get listFilter(): string{
      return this._listFilter;
    }
    set listFilter(value:string){
      this._listFilter = value;
      console.log('In setter:', value);
      this.filteredProducts = this.performFilter(value);
    }

    constructor(private productService: ProductService){}    


    performFilter(filterBy: string) :IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter(
        (product :IProduct) => product.productName.toLocaleLowerCase().includes(filterBy)
        )
    }

    ngOnInit(): void {
      this.sub = this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
      });

      this.filteredProducts = this.products;
      this.listFilter = '';
      console.log('In OnInit');
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    onRatingClicked(message: string) : void {
      this.pageTitle = 'Product List: ' + message;
    }

    toggleImage() : void{
      this.showImage = !this.showImage;
    }
}