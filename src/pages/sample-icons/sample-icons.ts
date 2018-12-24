import { ViewChild, Component } from '@angular/core';
import { NavController, Events, Slides, ToastController, Ion } from 'ionic-angular';

import Icons from '../../assets/icon/icons';

@Component({
  selector: 'page-sample-icons',
  templateUrl: 'sample-icons.html'
})

export class SampleIconsPage {
  @ViewChild(Slides) slides: Slides;
  icons=[];
  iconTypes = {
    icon:1,
    list:2,
    button:3,
    avatar:4,
  }

  iconTypeList = [
    {name:'icon',value:1},
    {name:'list',value:2},
    {name:'button',value:3},
    {name:'avatar',value:4},
    ];
  iconType=this.iconTypes.icon;

  constructor() {}

  ngOnInit() {    
    this.icons=Icons;
  }

  searchIcons(ev){

    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.icons = Icons.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.icons = Icons;
    }
  }

  selectIcon(icon)
  {
    console.log(icon);
  }


  resetFilter(e){

  }
}