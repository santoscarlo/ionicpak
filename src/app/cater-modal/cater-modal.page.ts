import { Component, OnInit, Input } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { ModalController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cater-modal',
  templateUrl: './cater-modal.page.html',
  styleUrls: ['./cater-modal.page.scss'],
})
export class CaterModalPage implements OnInit {

  @Input() product : Product;
isitemIn = false;

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
    this.isitemIn = true
    this.data = this.product;
  }
  }


  async  onSubmit(form: NgForm){
  const product = form.value
  // console.log(product)
  if(this.isitemIn){
    const validateIn = await this.alertController.create({
      header: 'Hello',
      message: 'Are you sure?',
      animated: true,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.service.updateIn(product, this.product.id).subscribe(()=>{
              product.id = this.product.id
              this.toastController.create({
                duration: 2000,
                message: 'Success'
              }).then((res) =>{
                res.present()
                this.modalCtrl.dismiss()
              })
            })
          }
        },
        {
          text: 'Cancel'
        }
      ]
    })
    await validateIn.present()


  }
}
closeModal(){
     this.modalCtrl.dismiss();
   }

}
