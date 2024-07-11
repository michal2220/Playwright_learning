import { expect } from "@playwright/test"


export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.fistName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.street = page.getByPlaceholder('Street')
        this.postCode = page.getByPlaceholder('Post code')
        this.city = page.getByPlaceholder('City')
        this.dropDown = page.locator('[data-qa="country-dropdown"]')

        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
    }

    fillDetails = async(userAddress) => {
        await this.fistName.waitFor()
        await this.fistName.fill(userAddress.firstName)
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

    saveDetails = async() => {
        const addressCountBeforeSaving = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving+1)   
    }
}