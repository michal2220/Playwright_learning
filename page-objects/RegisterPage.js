export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('e-mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: 'Register' })
    }

    signupAsNewUser = async () => {
        await this.page.pause()
        await this.emailInput.waitFor()
        await this.emailInput.fill("test@testers.com")

        await this.passwordInput.waitFor()
        await this.passwordInput.fill("password")

        await this.registerButton.waitFor()
        await this.registerButton.click()

        await this.page.pause()
    }
}