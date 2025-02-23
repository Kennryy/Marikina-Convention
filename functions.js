function openForm() {
    document.getElementById("reservationForm").style.display = "block";
}

function closeForm() {
    document.getElementById("reservationForm").style.display = "none";
}

function validateForm() {
        const contactNumber = document.getElementById("contactNumber").value;
        if (!/^\d+$/.test(contactNumber)) {
            alert("Contact number must contain only numbers.");
            return false;
        }
        return true;
    }

// Function to allow only numbers in the contact number field
function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// Form Validation Function
function validateForm() {
    var fullName = document.getElementById("fullName").value.trim();
    var contactNumber = document.getElementById("contactNumber").value.trim();
    var emailAddress = document.getElementById("emailAddress").value.trim();
    var eventType = document.getElementById("eventType").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventTime = document.getElementById("eventTime").value;

    if (fullName === "" || contactNumber === "" || emailAddress === "" || eventType === "" || eventDate === "" || eventTime === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    if (contactNumber.length < 10 || contactNumber.length > 11) {
        alert("Please enter a valid contact number (10-11 digits).");
        return false;
    }

    return true; // Submit the form if all checks pass
}


// Disable past dates and same-day reservations
document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("eventDate");
    const today = new Date();
    today.setDate(today.getDate() + 1);
    dateInput.min = today.toISOString().split('T')[0];
});

// Show error when clicking outside the form
window.onclick = function (event) {
    const form = document.getElementById("reservationForm");
    if (event.target == form) {
        showNotification("Please fill out the form completely before closing.");
    }
};

// Function to show notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Carousel setup function
function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    const track = carousel.querySelector(".carousel-inner");
    let startX = 0;
    let isDragging = false;
    let currentIndex = 0;

    function showSlide(index) {
        const items = track.querySelectorAll(".carousel-item");
        items.forEach((item, i) => {
            item.classList.remove("active");
            if (i === index) {
                item.classList.add("active");
            }
        });
    }

    track.addEventListener("mousedown", function (event) {
        isDragging = true;
        startX = event.clientX;
    });

    track.addEventListener("mousemove", function (event) {
        if (!isDragging) return;
        let moveX = event.clientX - startX;
        if (moveX > 50) { // Dragged Right (Previous Slide)
            currentIndex = (currentIndex - 1 + track.children.length) % track.children.length;
            showSlide(currentIndex);
            isDragging = false;
        } else if (moveX < -50) { // Dragged Left (Next Slide)
            currentIndex = (currentIndex + 1) % track.children.length;
            showSlide(currentIndex);
            isDragging = false;
        }
    });

    track.addEventListener("mouseup", function () {
        isDragging = false;
    });

    track.addEventListener("mouseleave", function () {
        isDragging = false;
    });
}

// Initialize carousels
document.addEventListener("DOMContentLoaded", function () {
    setupCarousel("weddingCarousel");
    setupCarousel("conferenceCarousel");
    setupCarousel("birthdayCarousel");
});
