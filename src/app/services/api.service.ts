import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url="http://localhost:3000"
  // base_url="https://ecart-backend-8icd.onrender.com/"


  searchTerm=new BehaviorSubject("")

  constructor(private http:HttpClient) { }

  register(user:any){
    return this.http.post(`${this.base_url}/user/register`,user)
  }
  
  login(user:any){
    return this.http.post(`${this.base_url}/user/login`,user)
  }
  getAllProductsAPI(){
    return this.http.get(`${this.base_url}/all-products`)
  }
  getAProductAPI(id:any){
    return this.http.get(`${this.base_url}/view-product/${id}`)

  }
  appendToken(){
    let headers=new HttpHeaders()
    const token=sessionStorage.getItem('token');
    if(token){
      headers=headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }
  addToWishlistAPI(product:any){
    return this.http.post(`${this.base_url}/wishlist`,product,this.appendToken())

  }
  getWishlistAPI(){
    return this.http.get(`${this.base_url}/get-wishlist`,this.appendToken())

  }
  deleteWishlistAPI(id:any){
    return this.http.delete(`${this.base_url}/delete-wishlist/${id}`,this.appendToken())

  }
  addToCartAPI(product:any){
    return this.http.post(`${this.base_url}/add-cart`,product,this.appendToken())

  }
  getCartAPI(){
    return this.http.get(`${this.base_url}/get-cart`,this.appendToken())

  }
  deleteCartAPI(id:any){
    return this.http.delete(`${this.base_url}/delete-cart/${id}`,this.appendToken())
  }
  incrementCartAPI(id:any){
    return this.http.get(`${this.base_url}/increment-cart/${id}`,this.appendToken())

  }
  decrementCartAPI(id:any){
    return this.http.get(`${this.base_url}/decrement-cart/${id}`,this.appendToken())

  }
}
