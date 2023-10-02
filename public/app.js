document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "patch") {
    const id = event.target.dataset.id;
    console.log(id);
    // patch(id).then(() => {
    //   event.target.closest("li").patch();
    // });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function patch(id) {
  const newTitle = event.target.value;
  await fetch(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: `${newTitle}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
