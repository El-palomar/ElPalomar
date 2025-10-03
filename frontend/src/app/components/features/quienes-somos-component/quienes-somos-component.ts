import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuienesSomosService } from "@services/quienes-somos"

@Component({
    selector: 'app-quienes-somos-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quienes-somos-component.html',
    styleUrls: ['./quienes-somos-component.css'],
})
export class QuienesSomosComponent implements OnInit {
    data: any;

    constructor(private quienesSomosService: QuienesSomosService) { }

    ngOnInit(): void {
        this.quienesSomosService.getData().subscribe((res: any) => {
            this.data = res;
        });
    }
}