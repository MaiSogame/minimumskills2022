const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

//基本タイムアウト時間が5000なので長めに設定
jest.setTimeout(100000);

//HOMEのテスト
it("HOMEページタイトル", async () => {

    //chromeを取得
    const driver = await new Builder().forBrowser("chrome").build();
    //ページに移動
    await driver.get("https://xxxxxxxxxxxxx.on.drv.tw/website");
    //タイトル取得
    const title = await driver.getTitle();
    //評価（titleが期待の文字列「WebSite」と一致するかチェック）
    expect(title).toBe("WebSite");
    //終了
    await driver.quit();

});

it("お問い合わせページ正常系", async () => {

    //chromeを取得
    const driver = await new Builder().forBrowser("chrome").build();
    //ページに移動
    await driver.get("https://oz89n3tinyjmyu6xb7e79g.on.drv.tw/website/contact.html");
    //タイトル取得
    const title = await driver.getTitle();
    //タイトル評価
    expect(title).toBe("WebSite|お問い合わせ");
    //formの操作
    //name取得し入力
    const contact_name = await driver.findElement(By.id("name"));
    contact_name.sendKeys("テスト太郎");
    //email取得し入力
    const email = await driver.findElement(By.id("email"));
    email.sendKeys("test@test.local");
    //body取得し入力
    const body = await driver.findElement(By.id("body"));
    body.sendKeys("hogehoge");
    //btn取得とクリック
    const submit_btn = await driver.findElement(By.id("submit_btn"));
    submit_btn.click();
    //alertが出るまで待つ
    await driver.wait(until.alertIsPresent());
    //アラートに移動
    const alert = await driver.switchTo().alert();
    //アラートメッセージ取得
    const alertText = await alert.getText();
    //評価
    expect(alertText).toBe("success!");
    //alertのOKを押す
    await alert.accept();
    //終了
    await driver.quit();

});

//Contactのテスト
it("お問い合わせページ異常系：name不正", async () => {

    //chromeを取得
    const driver = await new Builder().forBrowser("chrome").build();
    //ページに移動
    await driver.get("https://oz89n3tinyjmyu6xb7e79g.on.drv.tw/website/contact.html");
    //タイトル取得
    const title = await driver.getTitle();
    //タイトル評価
    expect(title).toBe("WebSite|お問い合わせ");
    //formの操作
    ///////////nameは未入力//////////////
    //email取得し入力
    const email = await driver.findElement(By.id("email"));
    email.sendKeys("test@test.local");
    //body取得し入力
    const body = await driver.findElement(By.id("body"));
    body.sendKeys("hogehoge");
    //btn取得とクリック
    const submit_btn = await driver.findElement(By.id("submit_btn"));
    submit_btn.click();
    //エラーメッセージが表示されているかチェック（表示されていたらtrueが返る）
    const name_error = await driver.findElement(By.id("name_error")).isDisplayed();
    expect(name_error).toBe(true);
    //終了
    await driver.quit();

});
