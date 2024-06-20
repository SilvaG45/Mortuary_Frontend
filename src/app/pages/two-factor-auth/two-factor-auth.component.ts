import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent implements OnInit {
  userId: string | null = null;
  twoFactorCode: string | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.paramMap.get('id');
    console.log('User ID on init:', this.userId);
    if (!this.userId) {
      console.error('No user ID found in route parameters');
      Swal.fire('Error', 'No user ID found in route parameters', 'error');
    }
  }

  verifyTwoFactorCode() {
    if (this.userId && this.twoFactorCode) {
      this.securityService.verifyTwoFactorCode(this.userId, Number(this.twoFactorCode)).subscribe({
        next: (response) => {
          this.securityService.saveSession(response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          Swal.fire('Error', 'Código de verificación incorrecto', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Faltan datos para la verificación', 'error');
    }
  }
}
