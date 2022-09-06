const frisby = require("frisby"); //frisbyを読み込む

//APIのURLを指定
const api_url = "https://script.google.com/macros/s/AKfycbzFvdkJ-9ejRA6MFGF641Yh7XS8QBAscGR6_WjxxZIJp4eNAqrXp_JdxXpd2iejzkEb/exec";
//正常系
it("正常系", async () => {

    const res = await frisby.post(api_url, {
        body: "name=aaa&email=test@test.local&body=foooooo",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    expect(JSON.parse(res._body)).toEqual({ message: "success!" });
});

//name不正
it("異常系：name不正", async () => {

    const res = await frisby.post(api_url, {
        body: "name=&email=test@test.local&body=foooooo",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    expect(JSON.parse(res._body)).toEqual({ message: "validation error!" });
});

//Email不正
it("異常系：Email不正", async () => {
    const res = await frisby.post(api_url, {
        body: "name=aaa&email=test&body=foooooo",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    expect(JSON.parse(res._body)).toEqual({ message: "validation error!" });
});

//問い合わせ不正
it("異常系：問合せ内容不正", async () => {
    const res = await frisby.post(api_url, {
        body: "name=aaa&email=test@test.local&body=foooooooooooooo",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    expect(JSON.parse(res._body)).toEqual({ message: "validation error!" });
});