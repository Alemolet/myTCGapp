import { Directive, Inject, Optional, Host, ComponentRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { FORM_ERRORS } from './common-form-errors';
import { merge, EMPTY, Observable } from 'rxjs';
import { FormSubmitDirective } from './form-submit.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';

@Directive({
 selector: '[formControl], [formControlName]'
})

export class ControlErrorsDirective {

  submit$: Observable<Event>;
  ref: ComponentRef<ControlErrorComponent>;
  resolver: any;
  container: ViewContainerRef;

 constructor(private vcr: ViewContainerRef,
             @Optional() controlErrorContainer: ControlErrorContainerDirective, 
             private control: NgControl,
             @Optional() @Host() private form: FormSubmitDirective,
             @Inject(FORM_ERRORS) private errors
  ) {
   this.submit$ = this.form ? this.form.submit$ : EMPTY;
   this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }
 
  ngOnInit() {
    merge(
      this.submit$,
      this.control.valueChanges
    ).pipe(
      untilDestroyed(this)
    ).subscribe((v) => {
      const controlErrors = this.control.errors;
      
      if (controlErrors) {
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.errors[firstKey];
        const text = getError(controlErrors[firstKey]);
        this.setError(text);
      } else if(this.ref) {
        this.setError(null);
      }
    });
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory);
    }
 
    this.ref.instance.text = text;
  }
 
 }
