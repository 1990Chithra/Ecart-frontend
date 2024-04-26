import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  product:any={}
  constructor(private route:ActivatedRoute,private api:ApiService){}
  ngOnInit(): void {
    this.viewProduct()
  }

  viewProduct(){
    //get product id
    this.route.params.subscribe((res:any)=>{
      console.log(res);

      const {id}=res;
      console.log(id);
    //get product details  
      this.api.getAProductAPI(id).subscribe((res:any)=>{
        console.log(res);
        this.product=res;
        
      })
    })
  }
  addToWishlist(){
    if(sessionStorage.getItem('token')){
      this.api.addToWishlistAPI(this.product).subscribe({
        next:(res:any)=>{
          alert("added to the wishlist")
        },
        error:(err)=>{
          alert("already added to the wishlist")

        }
      })
    }
    else{
      alert("please login")

    }
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
