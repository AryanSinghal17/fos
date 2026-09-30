const menu = document.getElementById("menu");
const orderBtn = document.getElementById("orderBtn");
const statusText = document.getElementById("status");

let menuData = [];

async function getMenu() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json",
    );

    const data = await response.json();

    menuData = data;

    data.forEach((item) => {
      menu.innerHTML += `
                <div class="card">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    
                    <div class="info">
                        <h3>${item.name}</h3>

                        <div class="price">
                            <span>$${item.price}</span>
                            <span>⭐ ${item.rate}</span>
                        </div>
                    </div>
                </div>
            `;
    });
  } catch (error) {
    console.log(error);
  }
}

function TakeOrder() {
  return new Promise((resolve) => {
    statusText.innerText = "Taking Order...";

    setTimeout(() => {
      const burgers = menuData.filter((item) =>
        item.name.toLowerCase().includes("burger"),
      );

      const order = [];

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * burgers.length);

        order.push(burgers[randomIndex]);
      }

      resolve({
        burgers: order,
      });
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    statusText.innerText = "Preparing Food...";

    setTimeout(() => {
      resolve({
        order_status: true,
        paid: false,
      });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    statusText.innerText = "Generating Bill & Payment...";

    setTimeout(() => {
      resolve({
        order_status: true,
        paid: true,
      });
    }, 1000);
  });
}

function thankyouFnc() {
  statusText.innerText =
    "✅ Payment Successful! Thank You For Eating With Us Today!";
}

async function startOrder() {
  try {
    const order = await TakeOrder();

    console.log("Order Received");
    console.log(order);

    const prep = await orderPrep();

    console.log("Food Prepared");
    console.log(prep);

    const payment = await payOrder();

    console.log("Payment Done");
    console.log(payment);

    if (payment.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.log(error);
  }
}

orderBtn.addEventListener("click", startOrder);

getMenu();
