import { Component, OnInit, Input } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { ProductService, Product } from '../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {
@Input() product: Product;
productinsert: { } ;
isUpdate = false; // para macheck yung modal kung nagagamit para sa update o hindi

// data na iuupdate tol

data = {
  id: '',
  item_name: '',
  item_desc: '',
  item_count: '',
  item_in: '',
  item_out: '',
  status: '',
  date_added: ''
};

  constructor(
    private  modalCtrl: ModalController,
    private service: ProductService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    if(this.product){   // para malaman kung hindi null tong property nato, ibig sabihin yung modal nasa update mode papa
    this.isUpdate = true;
    this.data = this.product;
  }
  }

  onSubmit(form: NgForm){
      const product = form.value;
      if(this.isUpdate){
        this.service.update(product, this.product.id).subscribe(() =>{
          // append id kung sinong id inuupdate.
          product.id = this.product.id;
          // console.log(product.id)
          this.modalCtrl.dismiss(product, 'updated')
        })
      }else{
        this.service.create(product).subscribe(response => {

          this.productinsert = response
          // console.log(this.productinsert)
          if(this.productinsert == 'created'){

            this.toastController.create({
              duration: 2000,
              message: 'Created Successfully'
            }).then((toast) =>{
              // console.log(toast)
              toast.present()
            }).then((destroy) =>{
                this.modalCtrl.dismiss(destroy)
            })
          }else if(this.productinsert == 'item exist'){
            this.toastController.create({
              duration: 2000,
              message: 'Item Exist'
            }).then((r) => {
              r.present();
            })

          }

        })
      }


      // console.log(form.value)
    }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
