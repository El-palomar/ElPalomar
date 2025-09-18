import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuienesSomosService } from '../../services/quienes-somos';

@Component({
  selector: 'app-quienes-somos-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quienes-somos.html',
  styleUrls: ['./quienes-somos.css'],
})
export class QuienesSomosC implements OnInit {
  data: any;

  constructor(private quienesSomosService: QuienesSomosService) {}

  ngOnInit(): void {
    this.quienesSomosService.getData().subscribe((res: any) => {
      this.data = res;
    });
  }
}
