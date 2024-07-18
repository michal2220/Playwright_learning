import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.dicsountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]')

        this.dicsountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.totalWithDiscount = page.locator('[data-qa="total-with-discount-value"]')
    }

    activateDiscount = async () => {
        await this.dicsountCode.waitFor()
        const code = await this.dicsountCode.innerText()
        await this.dicsountInput.waitFor()
        await this.dicsountInput.fill(code)
        await expect(this.dicsountInput).toHaveValue(code)

        //option 2 - slow typing
        // await this.dicsountInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        // expect(await this.dicsountInput.inputValue()).toBe(code)

        await this.totalValue.waitFor()

        await this.activateDiscountButton.waitFor()
        await expect(this.totalWithDiscount).toBeHidden()
        await this.activateDiscountButton.click()
        await expect(this.totalWithDiscount).toBeVisible()

        await this.discountActiveMessage.waitFor()
        expect(await this.discountActiveMessage.innerText()).toBe("Discount activated!")

        await this.totalWithDiscount.waitFor()

        const allInnerTotalValue = await this.totalValue.allInnerTexts()
        const totalValueNumber = allInnerTotalValue.map((element) => {
            const withoutDollar = element.replace("$", "")
            return parseInt(withoutDollar, 10)
        })

        const allInnerDiscountValue = await this.totalWithDiscount.allInnerTexts()
        const discountValueWithoutDollar = allInnerDiscountValue.map((element) => {
            const withoutDollar = element.replace("$", "")
            return parseInt(withoutDollar, 10)
        })

        expect(...discountValueWithoutDollar).toBeLessThan(...totalValueNumber)
        await this.page.pause()
    }
}