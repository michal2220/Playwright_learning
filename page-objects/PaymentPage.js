import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.dicsountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]')

        this.dicsountInput = page.locator('[data-qa="discount-code-input"]')
    }

    activateDiscount = async () => {
        await this.dicsountCode.waitFor()
        const code = await this.dicsountCode.innerText()

        await this.dicsountInput.waitFor()
        await this.dicsountInput.fill(code)
        await expect(this.dicsountInput).toHaveValue(code)
        await this.page.pause()

    }
}