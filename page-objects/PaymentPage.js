import { expect } from "@playwright/test"
import { timeout } from "../playwright.config"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.dicsountCode = page.frameLocator('[data-qa="active-discount-container"]')
            .locator('[data-qa="discount-code"]')

        this.dicsountInput = page.locator('[data-qa="discount-code-input"]')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.totalWithDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')

        this.creditCardOwner = page.getByPlaceholder('Credit card owner')
        this.creditCardNumber = page.getByPlaceholder('Credit card number')
        this.cardValidUntil = page.getByPlaceholder('Valid until')
        this.cardCVC = page.getByPlaceholder('Credit card CVC')
        this.payButton = page.locator('[data-qa="pay-button"]')

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

        expect(await this.totalWithDiscount.isVisible()).toBe(false)
        expect(await this.discountActiveMessage.isVisible()).toBe(false)

        await this.totalValue.waitFor()
        await this.activateDiscountButton.waitFor()

        await this.activateDiscountButton.click()
        await this.totalWithDiscount.waitFor()
        await this.discountActiveMessage.waitFor()
        expect(await this.totalWithDiscount.isVisible()).toBe(true)

        const allInnerTotalValue = await this.totalValue.innerText()
        const allInnerTotalValueString = allInnerTotalValue.replace("$", "")
        const totalValueNumber = parseInt(allInnerTotalValueString, 10)
        const allInnerDiscountValue = await this.totalWithDiscount.innerText()
        const discountValueString = allInnerDiscountValue.replace("$", "")
        const discountValueNumber = parseInt(discountValueString, 10)
        expect(discountValueNumber).toBeLessThan(totalValueNumber)
    }


    fillPaymentDetails = async (paymentDetails) => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(paymentDetails.cardOwner)
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(paymentDetails.cardNumber)
        await this.cardValidUntil.waitFor()
        await this.cardValidUntil.fill(paymentDetails.validUntil)
        await this.cardCVC.waitFor()
        await this.cardCVC.fill(paymentDetails.CVC)
    }

    completePayment = async () => {
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 })
    }
}