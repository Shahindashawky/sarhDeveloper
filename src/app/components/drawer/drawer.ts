import { Component, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
@Component({
  selector: 'app-drawer',
  standalone: false,
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss'
})
export class Drawerside {
    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e:any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;
}
