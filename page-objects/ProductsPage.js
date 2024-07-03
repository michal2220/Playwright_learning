import { expect } from "@playwright/test"
import { Navigation } from "./Nagivation.js"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        const basketCountAfterAdding = await navigation.getBasketCount()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }
}