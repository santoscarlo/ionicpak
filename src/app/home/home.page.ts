import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  productcharts: Product[];
   products: Product[];
   productsins: any;
   productsouts: any;
  constructor(
    private service: ProductService

  ) {}

  ionViewDidEnter(){


    this.service.getAllprodIn().subscribe(charttotalin =>{
      this.productsins  = charttotalin;
    })

    this.service.getAllprodOut().subscribe(charttotalout =>{
      this.productsouts = charttotalout
    })


    this.service.getAllChartTotal().subscribe(charttotal => {
        this.products = charttotal;


    })


    this.service.getAll().subscribe(response => {
      let item_count = response.map(response => response.item_count)
      let item_name = response.map(response => response.item_name)


      this.productcharts = new Chart('myChart', {

        type: 'line',
        data: {
          labels: item_name,
          datasets: [
            {
              data:item_count,
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
              borderColor: [
                 'rgba(255, 99, 132, 1)',
                 'rgba(54, 162, 235, 1)',
                 'rgba(255, 206, 86, 1)',
                 'rgba(75, 192, 192, 1)',
                 'rgba(153, 102, 255, 1)',
                 'rgba(255, 159, 64, 1)'
             ],
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes:[{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })

    })
 }

}
