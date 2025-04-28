import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../../layouts/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PrimaryInputComponent } from '../../../layouts/primary-input/primary-input.component';
import { PasswordModule } from 'primeng/password';


declare const tsParticles: any;

interface LoginForm {
  email: FormControl,
  password: FormControl
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthLayoutComponent, FormsModule, ReactiveFormsModule, PrimaryInputComponent, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  passwordFieldType: 'password' | 'text' = 'password';

  isDarkMode: boolean = false; 

  isLock: boolean = true;
  
  loginForm!: FormGroup<LoginForm>;

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

  navigate(){
    this.router.navigate(["/auth/register"])
  }

  reset(){
    this.router.navigate(["/auth/reset-password"])
  }


  ngOnInit() {
    this.loadParticles();
  }

  loadParticles() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2';
    script.onload = () => {
      this.initParticles();
    };
    document.body.appendChild(script);
  }

  initParticles() {
    tsParticles.load('tsparticles', {
      background: { color: this.isDarkMode ? '#121212' : '#ffffff' },
      fpsLimit: 60,
      particles: {
        number: { value: 50, density: { enable: true, area: 800 } },
        color: { value: this.isDarkMode ? '#ffffff' : '#000000' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          outModes: { default: 'bounce' }
        },
        links: {
          enable: true,
          color: this.isDarkMode ? '#ffffff' : '#000000',
          distance: 150,
          opacity: 0.3,
          width: 1
        }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 }
        }
      },
      detectRetina: true
    });
  }

  darkModeTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.initParticles();
  }


  lock() {
    this.isLock = !this.isLock;
    this.passwordFieldType = this.isLock ? 'password' : 'text';
  }
}
