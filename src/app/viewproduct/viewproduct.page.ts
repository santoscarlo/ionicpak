import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { ProductModalPage } from '../product-modal/product-modal.page';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.page.html',
  styleUrls: ['./viewproduct.page.scss'],
})
export class ViewproductPage implements OnInit {
  products: Product[];
  constructor(
    private service: ProductService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
      this.service.getAll().subscribe(response => {
  this.products = response;
  // console.log(response)
})
  }



  filterProductData(event: any){
      this.service.getAll().subscribe(res =>{
        this.products = res;
        const val = event.target.value;
        if(val && val.trim() !== ''){
          this.products = this.products.filter((product) => {
            return (product.item_name.toLowerCase().indexOf(val.toLowerCase()) >-1)
          })
        }
      })


    }

    async  removeProduct(id: string){

  const removealert = await  this.alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Yes',
          handler: () =>{
            this.service.remove(id).subscribe(()=>{
            this.products  = this.products.filter(prd => prd.id !== id)
            })
          }
        },{text: 'No'}
      ]
    })
    await removealert.present()
    // console.log(id);
  }


  updateStudent(product: Product){
      // console.log(product)
      this.modalCtrl.create({
        component: ProductModalPage,
        componentProps: {product}
      }).then(modal =>{
        modal.present()
        return modal.onDidDismiss()
      }).then(({data, role })=>{
        this.products = this.products.filter(prd => {
          if(data.id === prd.id){
            return data;
          }
          return prd;
        })
      })
    }

    addProduct(){
  this.modalCtrl.create({
    component: ProductModalPage
  }).then(modal => {
    modal.present()
    return modal.onDidDismiss()
  }).then(({data, role}) => {
    if(role === 'created'){
      this.products.push(data)
    }
  })
}

}
