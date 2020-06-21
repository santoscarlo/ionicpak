import { Component, ViewChildren } from '@angular/core';
import { IonSlides, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  templateUrl: './welcomepage.page.html',
  styleUrls: ['./welcomepage.page.scss'],
})
export class WelcomepagePage {
  // @ViewChildren(IonSlides) slides: IonSlides;
  // @ViewChildren(Slides) slides: IonSlides;


  buttonName = "Get Started";
  selectedSlide: any;






  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) { }

async  getStarted(){
    const gotoHome = await this.loadingController.create({
      duration: 2000
    })
await gotoHome.present()
    this.router.navigate(['./home'])
  }

  // slideChanged(){
  //   let currentIndex = this.slides.getActiveIndex();
  //   console.log('Current Index is', currentIndex);
  // }


}
