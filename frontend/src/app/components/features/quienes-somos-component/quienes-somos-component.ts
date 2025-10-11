import { Component, OnInit } from '@angular/core';
import { IQuienesSomos } from '@models/quienes-somos';

import { QuienesSomosService } from "@services/quienes-somos"

@Component({
    selector: 'app-quienes-somos-component',
    standalone: true,
    imports: [],
    templateUrl: './quienes-somos-component.html',
    styleUrls: ['./quienes-somos-component.css'],
})
export class QuienesSomosComponent implements OnInit {
    data: IQuienesSomos = {} as IQuienesSomos;

    constructor(private quienesSomosService: QuienesSomosService) { }

    ngOnInit(): void {
        this.quienesSomosService.getData().subscribe((res: IQuienesSomos) => {
            this.data = res;
        });
    }
}