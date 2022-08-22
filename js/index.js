
// 初始化数据
// 学生姓名列表
const fileInput = document.querySelector('#file');
var rosterList = ["张", "李", "王", "林"];
// 判断是否开始随机的标志
var flag = false;

// =================================
// 获取文件的输入
var file = my$("file")
// 获取所需要的元素
// 花名册表格
var rosterTable = my$("roster").children[1];
// 按钮
var btn = my$("btn");
// 结果展示区
var resultTr = my$("result").children[0].getElementsByTagName("tr")[0];
// 表格tr元素列表
var trList = my$("roster").children[1].getElementsByTagName("tr");
// 表格th元素列表
var thList = my$("roster").children[1].getElementsByTagName("th");
// 表格td元素列表
var tdList = my$("roster").children[1].getElementsByTagName("td");
// 选项列表
var ckList = my$("chooseBox").children[1].getElementsByTagName("input");
// 测试
// console.log(result);
// document
// ======================================

var aaa = [["张三", "李四"], ["张三", "李四"], ["张三", "李四"], ["张三", "李四"]]
// 动态的生成学生花名册
function DisplayRoster () {
    for (var i in aaa) {
        // 第一层循环控制行数
        var tr = document.createElement("tr");
        rosterTable.appendChild(tr);
        for (var j in aaa[i]) {
            // 第二层循环控制列数
            if (i == 0) {
                var th = document.createElement("th");
                th.innerHTML = aaa[i][j];
                tr.appendChild(th);
            } else {
                var td = document.createElement("td");
                td.innerHTML = aaa[i][j];
                tr.appendChild(td);
            }
        }
    }
}
DisplayRoster()

// 清除对应的数据
function ClearRoster () {
    rosterTable.innerHTML = ''
}

// =================主事件函数区===================
// 获取学生名单

file.addEventListener('change', function () {
    let file = event.target.files[0];
    let fileReader = new FileReader();

    if (!file) {
        // do nothing
    } else if (!/\.xl(s[xmb]|t[xm]|am)$/.test(file.name)) {
        alert('请选择 Excel 文件');
    } else {
        new Promise((resolve, reject) => {
            fileReader.onload = function (progressEvent) {
                try {
                    let data = progressEvent.target.result;
                    let workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    let col = null;
                    for (const n in workbook.Sheets) { // eslint-disable-line
                        // 这里是多张表格 所以写一个循环
                        aaa = XLSX.utils.sheet_to_json(workbook.Sheets[n], { header: 1, defval: '', blankbook: true }); // 解析为数组
                        break
                    }
                    ClearRoster()
                    DisplayRoster()
                    // resetRollItems();
                    // resolve();
                } catch (error) {
                    reject(error);
                }
            };

            fileReader.readAsBinaryString(file);
        })
            .then(() => {
                controlButton.disabled = false;
            })
            .catch(error => {
                throw error;
            });
    }
});

// 为按钮注册点击事件
btn.onclick = function () {
    flag = !flag;
    this.value = flag ? "停止" : "开始";
    clearInterval(btn.timeId);
    if (flag) {
        btn.timeId = setInterval(function () {
            // 检查是哪一个选项被选中了被选中了
            switch (true) {
                case ckList[0].checked: ck1Handle(); break;
                case ckList[1].checked: ck2Handle(); break;
                case ckList[2].checked: ck3Handle(); break;
                case ckList[3].checked: ck4Handle(); break;
            }
        }, 50)
    } else {
        clearInterval(btn.timeId);
    }
}

// ========函数封装区==============
function ck1Handle () {//选中第1个==>随机选中一个
    // 在花名册内容个数范围内生成一个随机数
    var random = parseInt(Math.random() * tdList.length);
    // 将随机数指向的元素插入展示区
    resultTr.innerHTML = "";
    resultTr.appendChild(tdList[random].cloneNode(true));
}
function ck2Handle () {//选中第2个==》随机选中三个
    // 清空展示区
    resultTr.innerHTML = "";
    var s = new Set;
    // let out = [];
    while (s.size < 3) {
        let ran = Math.floor(Math.random() * (tdList.length));
        if (s.has(ran)) {
            continue
        }
        s.add(ran)
        resultTr.appendChild(tdList[ran].cloneNode(true));
    }
}
function ck3Handle () {//随机一组
    // 在花名册行数范围内生成一个随机数
    var random = parseInt(Math.random() * thList.length);
    // 将随机数指向的元素插入展示区
    resultTr.innerHTML = "";
    // 将此列的元素的clone版依次追加到展示区中
    resultTr.appendChild(thList[random].cloneNode(true));
}
function ck4Handle () {//选中第4个==》随机选中一列
    // 清空展示区
    // 在花名册列数范围内生成一个随机数
    var random = parseInt(Math.random() * trList.length);
    for (var i = 0; i < trList.length; i++) {
        // 将随机数指向的元素插入展示区
        if (random == 0) {
            return
        }
        resultTr.innerHTML = "";
        resultTr.appendChild(trList[random].cloneNode(true));
    }// end for 
}