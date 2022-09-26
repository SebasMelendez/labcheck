tableEL = document.getElementById("material-columns");

async function checkoutHandler(id) {
  const response = await fetch("/api/materials" + "/" + id, {
    method: "put",
    body: JSON.stringify({
      available: false,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dash");
  } else {
    console.log(response);
  }
}

tableEL.addEventListener("click", (event) => {
  if (event.target.id) {
    let materialId = event.target.id;
    checkoutHandler(materialId);
  }
});
