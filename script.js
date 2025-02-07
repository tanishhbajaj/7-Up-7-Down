document.addEventListener("DOMContentLoaded", () => {
    function isPhoneDevice() {
        return /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent) || window.innerWidth <= 600;
    }

    if (!isPhoneDevice()) {
        if (!document.querySelector(".custom-cursor")) {
            const cursor = document.createElement("div");
            cursor.classList.add("custom-cursor");
            document.body.appendChild(cursor);
        }

        document.body.style.cursor = "none"; 

        document.addEventListener("mousemove", (e) => {
            const cursor = document.querySelector(".custom-cursor");
            if (cursor) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            }
        });

        document.addEventListener("mouseenter", () => {
            const cursor = document.querySelector(".custom-cursor");
            if (cursor) {
                cursor.style.display = "block";
            }
        });

        document.addEventListener("mouseleave", () => {
            const cursor = document.querySelector(".custom-cursor");
            if (cursor) {
                cursor.style.display = "none";
            }
        });
    } else {
        document.body.style.cursor = "default";
        const cursor = document.querySelector(".custom-cursor");
        if (cursor) cursor.remove(); // Remove cursor element on phones
    }
});

