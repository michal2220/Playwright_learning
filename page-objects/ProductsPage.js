import { expect } from "@playwright/test"
import { Navigation } from "./Nagivation.js"

export class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
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

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBefroeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitlesBefroeSorting)
    }
}