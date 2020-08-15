import { Component, OnInit } from '@angular/core';
import { userService } from '../../services/user.service'
import { IUser } from 'src/model/user';
import * as _ from "lodash";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Username', 'City', 'Pincode', 'Company Name'];
  dataSource: IUser[] = [];

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  public chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#f74548', '#46bfbd', '#fdb45c', '#949fb1']
    }
  ]
  public pieChartLabels: string[] = ['Latitude > 0', 'Latitude < 0', 'Longitude > 0', 'Longitude < 0'];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  public selUser: IUser;

  public perc: number = 0;

  constructor(public userService: userService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUser(user:IUser){
      this.selUser = user;
  }

  getUserData() {
    this.userService.getUsersData().subscribe
      (
        (response) => {
          if (response != null) {
            this.dataSource = response;
            var LanGreater = _.filter(this.dataSource, function (o) {
              if (o.address != null && o.address.geo != null)
                if (parseFloat(o.address.geo.lat) > 0) return o
            }).length;
            var LanLessthan = _.filter(this.dataSource, function (o) {
              if (o.address != null && o.address.geo != null)
                if (parseFloat(o.address.geo.lat) < 0) return o
            }).length;
            var LngGreater = _.filter(this.dataSource, function (o) {
              if (o.address != null && o.address.geo != null)
                if (parseFloat(o.address.geo.lng) > 0) return o
            }).length;
            var LngLessthan = _.filter(this.dataSource, function (o) {
              if (o.address != null && o.address.geo != null)
                if (parseFloat(o.address.geo.lng) < 0) return o
            }).length;
            this.pieChartData = [LanGreater, LanLessthan, LngGreater, LngLessthan]
              
            this.perc = _.uniq(_.map(this.dataSource, 'id')).length


          }
        },
        (error) => console.log(error)
      );
  }

}
