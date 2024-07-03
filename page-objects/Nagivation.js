export class Navigation {

    constructor(page) {
        this.page = page
        this.baskerCounter = page.locator('[data-qa="header-basket-count"]')
    }

    getBasketCount = async () => {

        await this.baskerCounter.waitFor()
        const text = await this.baskerCounter.innerText()
        return parseInt(text, 10)
    }

}