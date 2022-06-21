import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["admin@hospital.org", Validators.required],
      password: ["admin@123", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@hospital.org");
    this.authForm.get("password").setValue("admin@123");
  }
  doctorSet() {
    this.authForm.get("username").setValue("doctor@hospital.org");
    this.authForm.get("password").setValue("doctor@123");
  }

  inforSet() {
    this.authForm.get("username").setValue("informaticien@hospital.org");
    this.authForm.get("password").setValue("informaticien@123");
  }
  comptSet() {
    this.authForm.get("username").setValue("comptable@hospital.org");
    this.authForm.get("password").setValue("comptable@123");
  }
  infirSet() {
    this.authForm.get("username").setValue("infirmier@hospital.org");
    this.authForm.get("password").setValue("infirmier@123");
  }
  pharSet() {
    this.authForm.get("username").setValue("pharmacien@hospital.org");
    this.authForm.get("password").setValue("pharmacien@123");
  }
  receptSet() {
    this.authForm.get("username").setValue("reception@hospital.org");
    this.authForm.get("password").setValue("reception@123");
  }
  assuSet() {
    this.authForm.get("username").setValue("assurance@hospital.org");
    this.authForm.get("password").setValue("assurance@123");
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res) => {
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(["/admin/dashboard/main"]);
                } else if (role === Role.Doctor) {
                  this.router.navigate(["/doctor/dashboard"]);
                } else if (role === Role.Comptable) {
                  this.router.navigate(["/comptable/dashboard"]);
                } else if (role === Role.Reception) {
                  this.router.navigate(["/reception/dashboard"]);
                } else if (role === Role.Infirmier) {
                  this.router.navigate(["/infirmerie/dashboard"]);
                } else if (role === Role.Pharmacien) {
                  this.router.navigate(["/pharmacie/dashboard"]);
                } else if (role === Role.Informaticien) {
                  this.router.navigate(["/informatique/dashboard"]);
                } else if (role === Role.Assurance) {
                  this.router.navigate(["/assurance/dashboard"]);
                }
                else {
                  this.router.navigate(["/authentication/signin"]);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = "Invalid Login";
            }
          },
          error: (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        });
    }
  }
}
