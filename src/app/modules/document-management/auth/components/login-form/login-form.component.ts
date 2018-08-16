import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() errorMessage: string | null;
  @Output() submitted = new EventEmitter<String>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  constructor(
  ) { }


  ngOnInit() {
  }
  submit() {
    if (this.loginForm.valid) {
      this.submitted.emit(this.loginForm.value);
    }
  }

}
