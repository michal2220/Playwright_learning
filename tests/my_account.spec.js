import * as dotenv from "dotenv"
dotenv.config()
import { test } from "@playwright/test"
import { myAccountPage } from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"
import { adminDetails } from "../data/userDetails"

test.only("My account using cookie injection", async ({ page }) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    const myAccount = new myAccountPage(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])

    await myAccount.visit()
    await myAccount.waitForPageHeading()
})
