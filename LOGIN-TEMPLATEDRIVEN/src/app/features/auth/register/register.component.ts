import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { PasswordModule } from 'primeng/password';

import { AuthService } from '../services/auth.service';
import { AuthLayoutComponent } from '../../../layouts/components/auth-layout/auth-layout.component';

import { PrimaryInputComponent } from '../../../layouts/components/primary-input/primary-input.component';

import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl,
  password: FormControl
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AuthLayoutComponent, FormsModule, ReactiveFormsModule, PrimaryInputComponent, PasswordModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  loginForm!: FormGroup<LoginForm>;
  passwordFieldType: 'password' | 'text' = 'password';
  passwordFieldTypeConfirm: 'password' | 'text' = 'password';

  isLock: boolean = true;

  isLockConfirm: boolean = true;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private toastService: ToastrService
   
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.AuthService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.toastService.success("Login feito com sucesso!"),
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

  lock() {
    this.isLock = !this.isLock;
    this.passwordFieldType = this.isLock ? 'password' : 'text';
  }

  lockConfirm() {
    this.isLockConfirm = !this.isLockConfirm;
    this.passwordFieldTypeConfirm = this.isLockConfirm ? 'password' : 'text';
  }

  navigate(){
    this.router.navigate(["/auth/login"])
  }
}
