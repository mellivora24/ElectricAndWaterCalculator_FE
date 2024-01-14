const mainURL = "https://server-jkgp.onrender.com";

function calculateTotalPriceByMonth(records) {
  const totalPriceByMonth = {};

  records.forEach((record) => {
    const recordTime = new Date(record.recordTime);
    const monthYearKey = `${
      recordTime.getMonth() + 1
    }-${recordTime.getFullYear()}`;

    if (!totalPriceByMonth[monthYearKey]) {
      totalPriceByMonth[monthYearKey] = { water: 0, electric: 0 };
    }

    totalPriceByMonth[monthYearKey].water +=
      parseFloat(record.water) * parseFloat(record.wPrice);
    totalPriceByMonth[monthYearKey].electric +=
      parseFloat(record.electric) * parseFloat(record.ePrice);
  });

  return totalPriceByMonth;
}

var display = document.getElementById("flag");

display.innerHTML = `        
    <div id="logo_place_hoder">
            <img src="./img/place_hoder.jpeg" alt="">
        </div>`;

let Id, Name, Phone, Email, Pass;
var Used = [];

function get_date(index) {
  var dateTime = new Date(String(index.recordTime));

  var day = dateTime.getDate();
  var month = dateTime.getMonth() + 1;
  var year = dateTime.getFullYear();

  var fullDate = `${day}-${month < 10 ? "0" + month : month}-${year}`;

  return fullDate;
}
function get_time(index) {
  var dateTime = new Date(String(index.recordTime));

  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();

  var fullTime = `${hour}:${minute}:${second}`;

  return fullTime;
}

function eCalc(count) {
  let price = parseFloat(Used[count - 1].ePrice);
  let use = parseFloat(Used[count - 1].electric);

  return use * price;
}
function wCalc(count) {
  let price = parseFloat(Used[count - 1].wPrice);
  let use = parseFloat(Used[count - 1].water);

  return use * price;
}
function extract_data() {
  let html = "";
  let no = 0;

  Used.forEach((index) => {
    no += 1;
    let e = parseFloat(index.electric) * parseFloat(index.ePrice);
    let w = parseFloat(index.water) * parseFloat(index.wPrice);

    let content =
      '<tr class="on_hover">' +
      "<th>" +
      no +
      "</th>" +
      "<th>" +
      get_date(index) +
      "</th>" +
      "<th>" +
      get_time(index) +
      "</th>" +
      "<th>" +
      index.electric +
      "</th>" +
      "<th>" +
      index.water +
      "</th>" +
      "<th>" +
      e +
      "</th>" +
      "<th>" +
      w +
      "</th>" +
      "<th>" +
      (e + w) +
      "</th>" +
      "</tr>";
    html += content;
  });

  return html;
}

function home_page() {
  document.getElementById("overlay").innerHTML = "";

  var xhr =
    typeof XMLHttpRequest != "undefined"
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");

  xhr.open("get", "pages/home.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("toolbar").innerHTML = xhr.responseText;
    }
  };

  xhr.send();
}

function show_account() {
  // console.log("acc");
  var eremove = document.querySelector(".div-add");
  if (eremove && eremove.parentNode) {
    eremove.parentNode.removeChild(eremove);
  } else {
    eremove = document.querySelector(".data-list");
    if (eremove && eremove.parentNode) {
      eremove.parentNode.removeChild(eremove);
    } else {
      eremove = document.getElementById("contact");
      if (eremove && eremove.parentNode) {
        eremove.parentNode.removeChild(eremove);
      }
    }
  }
  var buttonGRP = document.getElementById("btn-edit");
  if (buttonGRP && buttonGRP.parentNode) {
    buttonGRP.parentNode.removeChild(buttonGRP);
  }

  var btn_account = document.getElementById("ac");
  var btn_data = document.getElementById("da");
  var btn_in = document.getElementById("in");

  btn_account.classList.add("clicked");
  btn_data.classList.remove("clicked");
  btn_in.classList.remove("clicked");

  var xhr =
    typeof XMLHttpRequest != "undefined"
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("get", "pages/account.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      display.innerHTML = xhr.responseText;
    }
  };

  xhr.send();

  let html =
    '<h1 id="name-1">Tên: ' +
    Name +
    "</h1>" +
    '<h1 id="phone-1">Số điện thoại: ' +
    Phone +
    "</h1>" +
    '<h1 id="mail-1">Email: ' +
    Email +
    "</h1>";

  let div = document.createElement("div");
  div.classList.add("div-add");

  div.innerHTML = html;

  var container = document.getElementById("flag");
  container.insertAdjacentElement("beforebegin", div);
}
function show_data() {
  // console.log("dat");
  var eremove = document.querySelector(".div-add");
  if (eremove && eremove.parentNode) {
    eremove.parentNode.removeChild(eremove);
  } else {
    eremove = document.querySelector(".data-list");
    if (eremove && eremove.parentNode) {
      eremove.parentNode.removeChild(eremove);
    } else {
      eremove = document.getElementById("contact");
      if (eremove && eremove.parentNode) {
        eremove.parentNode.removeChild(eremove);
      }
    }
  }
  var buttonGRP = document.getElementById("btn-edit");
  if (buttonGRP && buttonGRP.parentNode) {
    buttonGRP.parentNode.removeChild(buttonGRP);
  }

  var btn_account = document.getElementById("ac");
  var btn_data = document.getElementById("da");
  var btn_in = document.getElementById("in");

  btn_account.classList.remove("clicked");
  btn_data.classList.add("clicked");
  btn_in.classList.remove("clicked");

  let count = 0;
  Used.forEach((index) => {
    count += 1;
  });

  const date = new Date();
  const currentMonth = date.getMonth();

  let eAmount = 0;
  let wAmount = 0;

  const getErrorMessage = (message) => `
    <div style="color: red; margin: 8px; text-align: center; font-size: 32px;">${message}</b></div>
  `;

  let a = "";
  let b = "";

  Used.filter((item) => {
    const time = new Date(item.recordTime);
    return time.getMonth() === currentMonth;
  }).forEach((userItem) => {
    eAmount += parseFloat(userItem.electric) * parseFloat(userItem.ePrice);
    wAmount += parseFloat(userItem.water) * parseFloat(userItem.wPrice);
    const time = new Date(userItem.recordTime);
    if (date.getDate() === time.getDate()) {
      if (parseFloat(userItem.electric) > 7) {
        a = getErrorMessage("Cảnh báo điện năng tiêu thụ quá mức");
      }
      if (parseFloat(userItem.wPrice) > 1000) {
        b = getErrorMessage("Cảnh báo nước tiêu thụ quá mức");
      }
    }
  });

  try {
    let html =
      '<div class="general">' +
      '<div class="pay-box water">' +
      "<b>Tiền điện tháng này</b>" +
      '<div id="ele" style="color: red;">' +
      eAmount +
      " VNĐ</div>" +
      "</div>" +
      '<div class="pay-box electric">' +
      "<b>Tiền nước tháng này</b>" +
      '<div id="ele" style="color: red;">' +
      wAmount +
      " VNĐ</div>" +
      "</div>" +
      "</div>" +
      "<br>" +
      a +
      b +
      '<div class="box-body">' +
      '<table style="background-color: white;">' +
      '<thead style="background-color: aquamarine;">' +
      "<tr>" +
      "<th>STT</th>" +
      "<th>Ngày</th>" +
      "<th>Thời gian</th>" +
      "<th>Số điện tiêu thụ (kWh)</th>" +
      "<th>Số nước tiêu thụ (Lít)</th>" +
      "<th>Tiền điện phải trả (VNĐ)</th>" +
      "<th>Tiền nước phải trả (VNĐ)</th>" +
      "<th>Tổng (VNĐ)</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      extract_data() +
      "</tbody>" +
      "</table>" +
      "</div>";

    var newDiv = document.createElement("div");
    newDiv.classList.add("data-list");
    newDiv.innerHTML = html;

    var flag = document.getElementById("flag");
    flag.insertAdjacentElement("beforebegin", newDiv);
  } catch (error) {
    alert("Chưa có dữ liệu");
  }
}

function show_infor() {
  const displayReport = (message) => `
    <div style="color: black; margin: 8px; text-align: left; font-size: 20px;">${message}</b></div>
  `;

  const totalPriceByMonth = calculateTotalPriceByMonth(Used);

  const listReport = Object.keys(totalPriceByMonth)
    .map((month) => {
      return `${month}: water: ${totalPriceByMonth[month].water} (VNĐ) -  electric: ${totalPriceByMonth[month].electric} (VNĐ)`;
    })
    .map((mess) => displayReport(mess))
    .toString();

  var eremove = document.querySelector(".div-add");
  if (eremove && eremove.parentNode) {
    eremove.parentNode.removeChild(eremove);
  } else {
    eremove = document.querySelector(".data-list");
    if (eremove && eremove.parentNode) {
      eremove.parentNode.removeChild(eremove);
    } else {
      eremove = document.getElementById("contact");
      if (eremove && eremove.parentNode) {
        eremove.parentNode.removeChild(eremove);
      }
    }
  }
  var buttonGRP = document.getElementById("btn-edit");
  if (buttonGRP && buttonGRP.parentNode) {
    buttonGRP.parentNode.removeChild(buttonGRP);
  }

  var btn_account = document.getElementById("ac");
  var btn_data = document.getElementById("da");
  var btn_in = document.getElementById("in");

  btn_account.classList.remove("clicked");
  btn_data.classList.remove("clicked");
  btn_in.classList.add("clicked");

  var xhr =
    typeof XMLHttpRequest != "undefined"
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("get", "pages/information.html", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      display.innerHTML = xhr.responseText;
      display.innerHTML = listReport;
    }
  };
  xhr.send();
}

function change_infor() {
  var popup = document.getElementById("inf");
  popup.classList.remove("box-hide");
  popup.classList.add("box-display");
}
function change_pass() {
  var popup = document.getElementById("pas");
  popup.classList.remove("box-hide");
  popup.classList.add("box-display");
}
function save_inf() {
  var name = document.getElementById("ten");
  var phone = document.getElementById("sdt");
  var email = document.getElementById("email");

  const data = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    pass: Pass,
    used: Used,
  };

  let url = mainURL + "/update/" + Id;

  fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
      } else {
        const TMPurl = mainURL + "/home/" + phone.value + "/" + Pass;
        // console.log(url);

        fetch(TMPurl)
          .then((response) => response.json())
          .then((data) => {
            var newValue = data[0];
            Name = newValue.name;
            Phone = newValue.phone;
            Email = newValue.email;
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  hide_inf();
}
function save_pass() {
  var oldPass = document.getElementById("old");
  var newPass = document.getElementById("new");
  var confirmPass = document.getElementById("confirm");

  if (oldPass.value === Pass && newPass.value === confirmPass.value) {
    let url = mainURL + "/update/" + Id;

    const data = {
      name: Name,
      phone: Phone,
      email: Email,
      pass: newPass.value,
      used: Used,
    };

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(`HTTP error! Status: ${response.status}`);
        } else {
          Pass = newPass.value;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    alert("Sai mật khẩu!");
  }

  hide_pas();
}
function hide_inf() {
  var popup = document.getElementById("inf");
  popup.classList.add("box-hide");
}
function hide_pas() {
  var popup = document.getElementById("pas");
  popup.classList.add("box-hide");
}

function login() {
  var phone = document.getElementById("sdt");
  var pass = document.getElementById("pass");

  const url = mainURL + "/home/" + phone.value + "/" + pass.value;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var newValue = data[0];

      Id = newValue._id;
      Name = newValue.name;
      Phone = newValue.phone;
      Email = newValue.email;
      Pass = newValue.pass;
      Used = newValue.used;

      var overLay = document.getElementById("overlay");
      overLay.classList.remove("over-lay");
      overLay.classList.add("hide-over-lay");

      home_page();
    })
    .catch((error) => {
      alert("Sai tài khoản hoặc mật khẩu!");
      console.log(error);
    });
}

function signup_page() {
  var box_1 = document.getElementById("login");
  var box_2 = document.getElementById("signup");

  box_1.classList.remove("box-login-display");
  box_1.classList.add("box-hide");
  box_2.classList.remove("box-hide");
  box_2.classList.add("box-login-display");
}

function new_user() {
  var ten = document.getElementById("name");
  var phone = document.getElementById("phone");
  var email = document.getElementById("email");
  var pass = document.getElementById("newpass");

  if (
    ten.value == null ||
    phone.value == null ||
    email.value == null ||
    pass.value == null
  ) {
    alert("Error: value is missing!");
  } else {
    let url = mainURL + "/add-account";

    const data = {
      name: ten.value,
      phone: phone.value,
      email: email.value,
      pass: pass.value,
      used: [],
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Error:", error);
    });
  }
  alert("Đăng kí thành công!");
  return_signup();
}

function return_signup() {
  var box_2 = document.getElementById("login");
  var box_1 = document.getElementById("signup");

  box_1.classList.remove("box-login-display");
  box_1.classList.add("box-hide");
  box_2.classList.remove("box-hide");
  box_2.classList.add("box-login-display");
}
