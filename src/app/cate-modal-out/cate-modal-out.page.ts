import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ProductService, Product } from '../services/product.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cate-modal-out',
  templateUrl: './cate-modal-out.page.html',
  styleUrls: ['./cate-modal-out.page.scss'],
})
export class CateModalOutPage implements OnInit {

  @Input() product : Product;
  outness: { };
  isitemOut = false;


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
    private modalCtrl: ModalController,
    private service: ProductService,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    if(this.product){
    this.isitemOut =  true
    this.data = this.product
  }
  }

  async  onSubmit(form: NgForm){
    const product = form.value
    // console.log(product)

    if(this.isitemOut){
      const validateOut = await this.alertController.create({
        header: 'Hello',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.service.updateOut(product, this.product.id).subscribe((response) =>{
                product.id = this.product.id
                this.outness = response
                // console.log(response)
                // console.log(this.outness)
                if(this.outness == 'success'){
                  this.toastController.create({
                    duration: 2000,
                    message: 'Success'
                  }).then((res) =>{
                    res.present();
                  }).then((destroy) =>{
                    this.modalCtrl.dismiss(destroy)
                  })
                }else if(this.outness == 'insufficient'){
                  this.toastController.create({
                    duration: 2000,
                    message: 'Ops, insufficient item'
                  }).then((r) =>{
                    r.present()
                  })
                }else if(this.outness == 'ops'){
                  // console.log(this.outness)
                  this.toastController.create({
                    duration: 2000,
                    message: 'Ops, input is higher than expectation'
                  }).then((op) =>{
                    op.present()
                  })
                }


              })
            }
          }, {text: 'Cancel'}
        ]
      })
      await validateOut.present()

    }
  }


   closeModal(){
     this.modalCtrl.dismiss()
  }

}
