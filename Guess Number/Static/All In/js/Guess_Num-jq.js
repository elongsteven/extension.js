$(document).ready(function () {
  $("#body").css("opacity", 0)
  MenuLoad()
  console.log("加载完成")
})

function Begin() {
  $("#body").css("display", "block")
  $("#menu").css("display", "none")
  setTimeout(() => {
    $("#body").css("opacity", 1)
    $("#menu").css("opacity", 0)
  }, 0)
  Engine(1.6)
  setTimeout(() => {
    console.log(state)
  }, 3000)
}

// window.onload = Engine(1.6); // 页面载入时启动引擎
window.onpopstate = popState // 处理历史记录相关事件
var state, ui // 全局变量，在newgame()方法中会对其初始化
var now_time = 0 // 机会次数初始化
var opportunity = 8 // 机会次数缓存
var again = 8 // 机会初始化
var dataTimer = 0
var TIMEx4 = 0
var loadingTime = 0.8 // 再次加载所需时间

function BcakToMenu() {
  $("#menu").css("display", "block")
  $("#body").css("display", "none")
  setTimeout(() => {
    $("#menu").css("opacity", 1)
    $("#body").css("opacity", 0)
  }, 0)
}

function UpdataPage() {
  document.title = "更新日志"
  $("#body").css("display", "none")
  $("#Version").css("display", "block")
  setTimeout(() => {
    $("#body").css("opacity", 0)
    $("#Version").css("opacity", 1)
  }, 0)
}

function BackUp() {
  $("#body").css("display", "block")
  $("#Version").css("display", "none")
  setTimeout(() => {
    $("#body").css("opacity", 1)
    $("#Version").css("opacity", 0)
  }, 0)
  document.title = "我在想一个" + state.low + "到" + state.high + "之间的数字"
}

function Engine(t, bool) {
  // 初始化加载字符
  dataTimer++
  // 运行加载元素
  LoadDisplay("1")
  // 运行定时器
  timer = setInterval(function () {
    // console.log(dataTimer);
    if (dataTimer === 1) {
      $("#a").css("display", "none")
      $("#b").css("display", "block")
    } else if (dataTimer === 2) {
      $("#f").css("display", "none")
      $("#b").css("display", "none")
      $("#c").css("display", "block")
    } else if (dataTimer === 3) {
      $("#c").css("display", "none")
      $("#d").css("display", "block")
    } else if (dataTimer === 4) {
      $("#d").css("display", "none")
      $("#e").css("display", "block")
    } else if (dataTimer >= 5) {
      $("#e").css("display", "none")
      $("#f").css("display", "block")
      dataTimer = 1
      quattuor()
    } else {
    }
    dataTimer++
    // console.log("dataTimer=", dataTimer)
  }, 70)
  // 延迟执行 初始化 需要传递参数(单位：秒)
  console.log(bool)
  if (bool === "true") {
    setTimeout(newgame(true), t * 1000)
  } else {
    setTimeout(newgame, t * 1000)
  }
}

function quattuor() {
  // console.log("TIMEx4=", TIMEx4);
  TIMEx4++
  if (TIMEx4 === 1) {
    $("#4").css("display", "none")
    $("#1").css("display", "inline")
  } else if (TIMEx4 === 2) {
    $("#1").css("display", "none")
    $("#2").css("display", "inline")
  } else if (TIMEx4 === 3) {
    $("#2").css("display", "none")
    $("#3").css("display", "inline")
  } else if (TIMEx4 >= 4) {
    $("#3").css("display", "none")
    $("#4").css("display", "inline")
    TIMEx4 = 0
  } else {
  }
}
// input设置选项
// function setChange() {
//     var Setting = document.getElementById("setting").value;
//     opportunity = Setting;
//     computedTime();
// }

// button设置选项
function Setting() {
  var sel = confirm("这个按钮只在每局开始前生效，有且仅有一次，要修改机会次数吗？")
  if (sel == true) {
    var newSet = prompt("输入你想要的机会次数，必须是阿拉伯数字（别怪我没提醒过你）", "8")
    if (newSet === null) {
      alert("加油")
    } else {
      console.log("你修改了机会规则，为:", newSet)
      if (isNaN(newSet)) {
        alert("Emmm，你并没有输入纯数字，你浪费了这次机会")
        newSet = 10
      } else if (newSet >= 100) {
        alert("你怎么敢的呀?!")
        alert("给你改回去了")
        newSet = 10
      } else if (newSet >= 50) {
        alert("你这改的也忒多了吧？需要那么多次数吗")
        alert("这样吧，给你打个五折_(:3」∠)_")
        // 新需求
        newSet = Math.floor(newSet / 2)
      } else if (newSet >= 30) {
        alert("Emmm，次数这么多？")
        alert("那么，不介意我拿走三分之一吧？")
        now_time = Math.floor(newSet / 3)
      } else if (newSet >= 20) {
        alert("Emmm，你这把稳了，还怕输？")
        alert("你要真就再失败了，那我也真就没话说了")
        newSet = newSet
      } else if (newSet > 8) {
        alert("对自己有点信心嘛")
        alert("或许下次可以试试原生的8次，加油")
        newSet = newSet
      } else if (newSet == 8) {
        alert(". . .")
        alert("所以你到底改了没")
        newSet = newSet
      } else if (newSet >= 3) {
        alert("勇于尝试，我看好你哦")
        newSet = newSet
      } else if (newSet >= 1) {
        alert("你认真的？")
        newSet = newSet
      } else if (newSet <= 0) {
        alert("Emmm，皮一下很开心？")
        now_time = newSet
        DOGE()
      } else {
        alert("我不知道你是通过什么方式触发这个弹窗的")
        alert("如果你看到了这个弹窗，一定要告诉这个页面的开发者")
        alert("毕竟一般人都不会触发到这个代码，除非你用了一些手段，或者是捅到了我没有修复的BUG")
        alert("对吧？你这个肮脏的黑客！")
        $("#body").css("opacity", 0)
      }
      opportunity = Math.round(newSet)
      computedTime()
      console.log("已修改为：", newSet)
    }
  } else {
    alert("好的")
    console.log("未修改")
  }
  SetBlock("none")
}

function newgame(playagain) {
  // 重置
  opportunity = again
  now_time = 0
  computedTime()
  SetBlock("block")
  LoadDisplay("0")
  ui = {
    heading: null, //文档最上面的<h1>元素
    prompt: null, //要求用户输入一个猜测数字
    input: null, //用户输入猜测数字的地方
    low: null, //可视化的三个表格单元格
    mid: null, //猜测的数字范围
    high: null,
  }
  //查询这些元素中每个元素的id
  for (var id in ui) ui[id] = document.getElementById(id)
  //给input字段定义一个事件处理程序函数
  ui.input.onchange = handleGuess
  //生成一个随机的数字并进行初始化
  state = {
    n: Math.floor(99 * Math.random()) + 1, //整数： 0 < n <100
    low: 0, //可猜数字范围下限
    high: 100, //可猜数字范围上限
    guessnum: 0, //猜测的次数
    guess: undefined, //最后一次猜测
  }
  //修改文档内容来显示该初始状态
  display(state)
  if (playagain === true) save(state)
}

function save(state) {
  if (!history.pushState) return //如果pushState()方法没有定义，则什么也不做

  //将一个保存的状态和url关联起来
  var url = "#guess" + state.guessnum

  history.pushState(
    state, //要保存的状态对象
    "", //状态标题：当前浏览器会忽视它
    url
  ) //状态URL：对书签是没有用的
}

//这是onpopstate的事件处理程序，用于恢复历史状态
function popState(event) {
  if (event.state) {
    //如果事件有一个状态对象，则恢复该状态
    state = event.state //恢复历史状态
    display(state) //显示恢复的状态
  } else {
    history.replaceState(state, "", "#guess" + state.guessnum)
  }
}

//每次猜测一个数字的时候，都会调用此事件处理程序
//此处理程序用于更新状态、保存状态并显示状态
function handleGuess() {
  SetBlock("none")
  //从input字段中获取用户猜测的数字
  var g = parseInt(this.value)
  //如果该值是限定范围中的一个数字
  if (g > state.low && g < state.high) {
    //对应的更新状态
    if (g < state.n) state.low = g
    else if (g > state.n) state.high = g
    state.guess = g
    state.guessnum++
    //在浏览器历史记录中保存新的状态
    save(state)
    //根据用户猜测情况来修改文档
    display(state)
    // 计数执行
    now_time++
    computedTime()
  } else {
    //无效的猜测：不保存状态
    alert("请输入大于" + state.low + "和小于" + state.high)
  }
}

//修改文档来显示当前状态
function display(state) {
  //显示文档的导航和标题
  ui.heading.innerHTML = document.title = "我在想一个" + state.low + "到" + state.high + "之间的数字"

  //使用一个表格来显示数字的取值范围
  ui.low.style.width = state.low + "%"
  ui.mid.style.width = state.high - state.low + "%"
  ui.high.style.width = 100 - state.high + "%"

  //确保input字段是可见的、空的并且是聚焦的
  ui.input.style.visibility = "visible"
  ui.input.value = ""
  ui.input.focus()
  // 机会次数判定
  if (now_time < opportunity - 1) {
    // computedTime();
    // GAME_OVER();
    //根据用户最近猜测，设置提示
    if (state.guess === undefined) ui.prompt.innerHTML = "输入你的猜测："
    else if (state.guess < state.n) ui.prompt.innerHTML = state.guess + "低了，再猜一次："
    else if (state.guess > state.n) ui.prompt.innerHTML = state.guess + "高了，再猜一次："
    else {
      computedTime()
      Win()
    }
    //
  } else if (now_time === opportunity - 1 && state.guess === state.n) {
    computedTime()
    Win()
  } else {
    computedTime()
    GAME_OVER()
  }
}
//当猜对了的时候，就隐藏input字段并显示“再玩一次”按钮
function Win() {
  ui.input.style.visibility = "hidden"
  ui.heading.innerHTML = document.title = state.guess + "正确！"
  ui.prompt.innerHTML = "你赢了 <button onclick='Engine(loadingTime,true)'>再来一次</button>"
}

// 当机会用完，隐藏input字段并显示“RESET”按钮
function GAME_OVER() {
  ui.input.style.visibility = "hidden"
  ui.heading.innerHTML = document.title = "GAME OVER &nbsp;&nbsp; 你的机会用完了"
  ui.prompt.innerHTML = "这次的答案是：" + state.n + " <button onclick='Engine(loadingTime)'>再试一次</button>"
}

// 肮脏的黑客
function DOGE() {
  ui.input.style.visibility = "hidden"
  ui.heading.innerHTML = document.title = "不愧是你 &nbsp;&nbsp; 是真的皮"
  ui.prompt.innerHTML = "<button onclick='Engine(2.4)'>再试一次</button>"
}

// 计算"剩余的机会"动态颜色及长度
function computedTime() {
  // if (now_time === 0) {} else {
  var judge = 10 - (now_time / opportunity) * 10
  $("#OU").css("width", judge * 10 + "%")
  // console.log(100 - now_time / opportunity * 100 + "%");\
  // console.log(judge)
  // }
  $("#TimeNum").html(opportunity - now_time)
  if (judge >= 10) {
    $("#OU").css("background", "rgb(0, 162, 156)")
  } else if (judge >= 9) {
    $("#OU").css("background", "rgb(0, 162, 108)")
  } else if (judge >= 8) {
    $("#OU").css("background", "rgb(0, 162, 60)")
  } else if (judge >= 7) {
    $("#OU").css("background", "rgb(0, 162, 12)")
  } else if (judge >= 6) {
    $("#OU").css("background", "rgb(36, 162, 0)")
  } else if (judge >= 5) {
    $("#OU").css("background", "rgb(84, 162, 0)")
  } else if (judge >= 4) {
    $("#OU").css("background", "rgb(132, 162, 0)")
  } else if (judge >= 3) {
    $("#OU").css("background", "rgb(162, 144, 0)")
  } else if (judge >= 2) {
    $("#OU").css("background", "rgb(162, 96, 0)")
  } else if (judge >= 1) {
    $("#OU").css("background", "rgb(162, 48, 0)")
  } else if (judge >= 0) {
    $("#OU").css("background", "rgb(162, 0, 0)")
  }
}

// 传参值为"block"或"none"，显示和隐藏按钮
function SetBlock(a) {
  $("#settingBut").css("display", a)
}

// 传参值为"0"(隐藏)或"1"(显示)，来控制加载动画
function LoadDisplay(a) {
  if (a === "1") {
    $("#x").css("display", "inline-block")
    $("#loading").css("display", "block")
    $("#loadBack").css("display", "block")
    setTimeout(() => {
      LoadOpacity(a)
    }, 0)
  } else if (a === "0") {
    LoadOpacity(a)
    clearInterval(timer)
    setTimeout(() => {
      $("#a").css("display", "none")
      $("#b").css("display", "none")
      $("#c").css("display", "none")
      $("#d").css("display", "none")
      $("#e").css("display", "none")
      $("#f").css("display", "none")
      $("#1").css("display", "none")
      $("#2").css("display", "none")
      $("#3").css("display", "none")
      $("#4").css("display", "none")
      $("#x").css("display", "none")
      $("#loading").css("display", "none")
      $("#loadBack").css("display", "none")
    }, 800)
  } else {
  }
}

// 为Opacity准备的模板，与LoadDisplay()配合使用
function LoadOpacity(value) {
  $("#a").css("opacity", value)
  $("#b").css("opacity", value)
  $("#c").css("opacity", value)
  $("#d").css("opacity", value)
  $("#e").css("opacity", value)
  $("#f").css("opacity", value)
  $("#1").css("opacity", value)
  $("#2").css("opacity", value)
  $("#3").css("opacity", value)
  $("#4").css("opacity", value)
  $("#x").css("opacity", value)
  $("#loading").css("opacity", value)
  $("#loadBack").css("opacity", value)
}

function MenuLoad() {
  $("#a").css("display", "none")
  $("#b").css("display", "none")
  $("#c").css("display", "none")
  $("#d").css("display", "none")
  $("#e").css("display", "none")
  $("#f").css("display", "none")
  $("#1").css("display", "none")
  $("#2").css("display", "none")
  $("#3").css("display", "none")
  $("#4").css("display", "none")
  $("#x").css("display", "none")
  $("#loading").css("display", "none")
  $("#loadBack").css("display", "none")
  $("#Version").css("display", "none")
  $("#body").css("display", "none")
}
