import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private api:ApiService){}

  wishlistArray:any=[]
  ngOnInit(): void {
    this.getWishlistProduct()
  }
  getWishlistProduct(){
    this.api.getWishlistAPI().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.wishlistArray=res
        
      },
      error:(err:any)=>{
        console.log("error",err);
        
      }
    })
  }
deleteWishlistProduct(id:any){
  this.api.deleteWishlistAPI(id).subscribe((res:any)=>{
    alert("Product deleted successfully")
    this.getWishlistProduct()
  })
}
addToCart(product:any){
  Object.assign(product,{quantity:1})
  console.log(product);
  this.api.addToCartAPI(product).subscribe((res:any)=>{
    console.log(res);
    alert(res)
  })

  
}


}
