import { test } from "@playwright/test"
import { myAccountPage } from "../page-objects/MyAccountPage"
import { getLoginToken } from "../api-calls/getLoginToken"

test.only("My account using cookie injection", async ({ page }) => {
    const myAccount = new myAccountPage(page)
    await myAccount.visit()
})