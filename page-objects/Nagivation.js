export class Navigation {

    constructor(page) {
        this.page = page
        this.baskerCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink = this.page.getByRole('link', { name: 'Checkout' })
    }

    getBasketCount = async () => {

        await this.baskerCounter.waitFor()
        const text = await this.baskerCounter.innerText()
        return parseInt(text, 10)
    }

    goToCheckout = async() => {
        await this.checkOutLink.waitFor()
        await this.checkOutLink.click()
        await this.page.waitForURL("/basket")
    }

}