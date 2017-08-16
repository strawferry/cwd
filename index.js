


const request = require('request');

exports = module.exports = function (options) {

    return function CodingHookDingDing (req, res, next) {

        let event = req.headers['x-coding-event'],
            body = req.body;

        switch (event){
            case "push":
                return Push(req, res, next);

            case "ping":
                return res.json({
                    "token": "123",
                    "zen": "Coding！ 让开发更简单"
                });
            default:
                return res.json(body);
        }
    };
};

function Push(req, res, next) {

    let body = req.body;
    let ding = body.token;
    let count = body.commits.length;
    let whopush = body.commits[0].committer.name;
    let repourl = `${body.repository.owner.web_url}/p/${body.repository.name}/git/tree/${getbranch(body.ref)}`;
    let branch = `# [[${body.repository.name}/${getbranch(body.ref)}]](${repourl})`;
    let text = `${branch} ${count} commit,push by ${whopush}\n ## commits:\n`;
    for (let i = 0; i < count; i++){
        let com = body.commits[i];
        let name = com.committer.name;
        let mes = com.short_message;
        let hash6 = com.sha.substring(0,6);
        let commit = `> </> ${name}: [[${hash6}]](${com.web_url})-${mes}\n`;
        text = text + commit;
    }
    console.log(text);
    let rqbody = {
        msgtype: "markdown",
        markdown: {
            title:"仓库有新的代码更新咯!",
            text: text
        }
    };
    let options = {
        url: ding,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rqbody)
    };

    request.post(options, (err, res, body)=>{
        if(!err && res.statusCode == 200){
            let info = JSON.parse(body);
            console.log(info);
        }
    });
    res.json({mes: 'ok'});
}

function getbranch(str) {
    let arr = str.split('/');
    return arr[arr.length-1];
}