import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproducts:any[],searchTerm:string,propsName:string): any[] {
    const result:any[]=[]

    if(!allproducts || searchTerm=="" || propsName==""){
      return allproducts;
    }
   // searchTerm==propsName ?
   allproducts.forEach((item:any)=>{
    if(item[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
      result.push(item)
    }
   })
    return result;
  }

}
