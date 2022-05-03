async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("input[name='post-title']").value;
    const contents = document.querySelector("textarea").value;

    const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            contents
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
};

// change logo to dashboard
document.querySelector("#logo").innerHTML = "Your Dashboard";

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);
document.querySelector("#addNewPostBtn").addEventListener("click", function() {
    document.querySelector("#new-post-form-display").style.display = "block";
});