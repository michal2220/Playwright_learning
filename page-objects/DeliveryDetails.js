import { expect } from "@playwright/test"
import { timeout } from "../playwright.config"


export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postCode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.dropDown = page.locator('[data-qa="country-dropdown"]')

        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')

        this.savedAddresFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddresLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddresStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddresPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddresCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddresCountry = page.locator('[data-qa="saved-address-country"]')

        this.goToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })

    }

    fillDetails = async (userAddress) => {
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)
        await this.lastName.waitFor()
        await this.lastName.fill(userAddress.lastName)
        await this.street.waitFor()
        await this.street.fill(userAddress.street)
        await this.postCode.waitFor()
        await this.postCode.fill(userAddress.postCode)
        await this.city.waitFor()
        await this.city.fill(userAddress.city)
        await this.dropDown.waitFor()
        await this.dropDown.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

        await this.savedAddresFirstName.first().waitFor()
        expect(await this.savedAddresFirstName.first().innerText()).toBe(await this.firstName.inputValue())

        await this.savedAddresLastName.first().waitFor()
        expect(await this.savedAddresLastName.first().innerText()).toBe(await this.lastName.inputValue())

        await this.savedAddresStreet.first().waitFor()
        expect(await this.savedAddresStreet.first().innerText()).toBe(await this.street.inputValue())

        await this.savedAddresPostCode.first().waitFor()
        expect(await this.savedAddresPostCode.first().innerText()).toBe(await this.postCode.inputValue())

        await this.savedAddresCity.first().waitFor()
        expect(await this.savedAddresCity.first().innerText()).toBe(await this.city.inputValue())

        await this.savedAddresCountry.first().waitFor()
        expect(await this.savedAddresCountry.first().innerText()).toBe(await this.dropDown.inputValue())

    }

    continueToPayment = async () => {
        await this.goToPaymentButton.waitFor()
        await this.goToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000 })
    }
}


