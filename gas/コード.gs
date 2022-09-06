const doPost = (e) => {

    //値の受取り
    const name = e.parameter.name;
    const email = e.parameter.email;
    const body = e.parameter.body;

    //エラー処理
    const email_exp = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/;
    const body_exp = /^.{1,10}$/;
 
    //問題があればエラーを返す（なければ処理を継続）
    if(name == ""|| !email_exp.test(email) || !body_exp.test(body)){
      return ContentService.createTextOutput(JSON.stringify({ message: "validation error!" }));
    }

    //スプレッドシートの準備
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("シート1");

    //シートの一番下の行に追加
    sheet.appendRow([name, email, body, new Date()]);

    //応答
    return ContentService.createTextOutput(JSON.stringify({ message: "success!" }));
}