tableEL = document.getElementById("checkin-table");

async function checkoutHandler(id) {
  const response = await fetch("/api/materials" + "/" + id, {
    method: "put",
    body: JSON.stringify({
      student_id: 1,
      available: true,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dash");
  } else {
    console.log(response);
    alert("check console: err");
  }
}

tableEL.addEventListener("click", (event) => {
  if (event.target.id) {
    let idText = event.target.id;
    const idArray = idText.split("-");
    let checkinMaterialId = idArray.filter(getId);
    function getId(id) {
      return id >= 1;
    }
    checkoutHandler(checkinMaterialId);
  }
});
