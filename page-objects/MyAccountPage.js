export class myAccountPage {
    constructor(page) {
        this.page = page
    }

    visit = async() => {
        const loginToken = await getLoginToken()
        console.log.console.warn({loginToken});
        

        await this.page.goto("/my-account")
        await this.page.pause()
    }
}