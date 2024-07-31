import { isDesktopViewPort } from "../utils/isDesktopViewport.js"

export class Navigation {

    constructor(page) {
        this.page = page
        this.baskerCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = this.page.getByRole('link', { name: 'Checkout' })
        this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {
        await this.baskerCounter.waitFor()
        const text = await this.baskerCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async () => {
        if (!isDesktopViewPort(this.page)) {
            await this.mobileBurgerButton.waitFor()
            await this.mobileBurgerButton.click()
        }
        await this.checkOutLink.waitFor()
        await this.checkOutLink.click()
        await this.page.waitForURL("/basket")
    }

}