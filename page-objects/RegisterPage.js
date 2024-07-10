import { v4 as uuidv4 } from 'uuid';

export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    signupAsNewUser = async () => {
        await this.emailInput.waitFor()
        const emailId = uuidv4()+"@testers.com"
        await this.emailInput.fill(emailId)

        await this.passwordInput.waitFor()
        const password = uuidv4()
        await this.passwordInput.fill(password)

        await this.registerButton.waitFor()
        await this.registerButton.click()

        await this.page.pause()
    }
}