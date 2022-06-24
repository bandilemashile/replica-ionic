import { FormBuilder, FormGroup,ValidatorFn,Validators } from "@angular/forms";

export class RegisterPageForm{

    private formbuilder:FormBuilder;
    private form:FormGroup;

    constructor(formbuiler:FormBuilder)
    {
        this.formbuilder = formbuiler;
        this.form = this.createForm();

    }

    private createForm() : FormGroup{
       let form = this.formbuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,Validators.minLength(6)]],
        repeatPassword: ['',Validators.minLength(6)],
        phone: ['', [Validators.required]],
        address : this.formbuilder.group({
            street: ['', [Validators.required]],
            number: ['', [Validators.required]],
            neighbourhood: ['', [Validators.required]],
            complement: ['', [Validators.required]],
            zipCode: ['', [Validators.required]],
            state: ['', [Validators.required]],
            city: ['', [Validators.required]]
        })

       });
       form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));
       return form
    }

    getForm(): FormGroup{
        return this.form;
    }

}

function matchPasswordAndRepeatPassword(form:FormGroup) :ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () =>{
        return password.value == repeatPassword.value ? null : {isntMatching :true}
    }

    return validator
}