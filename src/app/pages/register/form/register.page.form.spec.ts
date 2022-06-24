import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form"

describe('Register page form',() => {

    let registerPageForm : RegisterPageForm;
    let form:FormGroup;

    beforeEach(() => {
        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();
    })

    it('should empty name be invalid', () => {
        expect(form.get('name').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('email').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('password').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('repeatPassword').valid).toBeTruthy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('phone').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('address').get('street').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('address').get('number').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('address').get('neighbourhood').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('address').get('zipCode').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('address').get('state').valid).toBeFalsy();
    })

    it('should empty name be invalid', () => {
        expect(form.get('address').get('city').valid).toBeFalsy();
    })


    it('should email  be invalid', () => {
        form.get('email').setValue('invalid@email.com')

        expect(form.get('email').valid).toBeTruthy();
    })

    // it('should password be less the 7 char  be invalid', () => {
    //     form.get('password').setValue('12345')

    //     expect(form.get('password').valid).toBeTruthy();
    // })

    // it('should password be less the 7 char  be invalid', () => {
    //     form.get('password').setValue('12345')
    //     form.get('repeatPassword').setValue('12345')

    //     expect(form.get('repeatPassword').valid).toBeFalsy();
    // })
})