document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "put") {
    const id = event.target.dataset.id;
    newTitle = prompt("Введите новое название");
    put(id, newTitle).then(() => {
      event.target.closest("li").querySelector(".item").innerHTML = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function put(id, newTitle) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: `${newTitle}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
