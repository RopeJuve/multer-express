const form = document.querySelector("form");
const toast = document.querySelector("#toast");
const input = document.querySelector("#upload-file");
const p = document.querySelector("#message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const res = await fetch("/upload-profile-pic", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data) {
      toast.classList.remove("translate-x-[-1000px]");
      toast.classList.add("translate-x-0");
      p.innerHTML = data.message;
      setTimeout(() => {
        toast.classList.remove("translate-x-0");
        toast.classList.add("translate-x-[-1000px]");
      }, 2000);
    }
    form.reset();
  } catch (err) {
    console.error(err);
  }
});
