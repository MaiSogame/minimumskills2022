function checkWeb() {
    //チェック対象のサイト
    const check_url = "https://xxxxxx.on.drv.tw/website";
    //エラー確認用（サーバダウン）
    //const check_url = "https://xxxxxxx.on.drv.tw/website";

    const monitoring_email = "{監視用メールアドレス}";

    //リクエストを投げる
    const response = UrlFetchApp.fetch(check_url, {
      muteHttpExceptions: true,
    });

    //ステータスをチェック
    if (response.getResponseCode() === 200) {
        //内容チェック
        const title_exp = /<title>(.*?)<\/title>/;
        const titleArray = response.getContentText().match(title_exp);
        const title = titleArray[1];
        if (title === "WebSite") {
            console.log("正常");
        }else{
            MailApp.sendEmail({
                to: monitoring_email,
                subject: "警告：WebSiteエラー検知",
                htmlBody: `WebSiteの異常を検知しました。改ざんの可能性があります。確認してください。`,
            });
        }
    } else {
        MailApp.sendEmail({
            to: monitoring_email,
            subject: "警告：WebSiteダウン検知",
            htmlBody: `WebSiteのダウンを検知しました。確認してください。`,
        });
    }
}