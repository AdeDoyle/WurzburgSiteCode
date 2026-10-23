let records = [];
let sortOrders = {};

async function loadData() {
    try {
        const res = await fetch("Clavis Litterarvm Hibernensivm.json");
        const data = await res.json();

        records = data.records;
        sortOrders = data.sortOrders;

        renderList("byTitle");
    } 
    catch (err) {
        console.error("Error loading JSON:", err);
        document.getElementById("list").textContent = "Failed to load data.";
    }
}

function getDisplayDate(entry) {
    // Priority logic for date display
    if (entry["Numerical dates"] && String(entry["Numerical dates"]).toLowerCase() !== "unknown") {
        return entry["Numerical dates"];
    }

    if (entry["Roman dates"] && String(entry["Roman dates"]).toLowerCase() !== "unknown") {
        return entry["Roman dates"];
    }

    if (entry["Reworked date"] && String(entry["Reworked date"]).toLowerCase() !== "unknown") {
        return entry["Reworked date"];
    }

    return null;
}

function renderList(mode) {
    const container = document.getElementById("list");
    container.innerHTML = "";

    const order = sortOrders[mode];

    order.forEach(idx => {
        const entry = records[idx];

        // Item container
        const item = document.createElement("div");
        item.className = "list-group-item";

        // Title row (clickable)
        const title = document.createElement("div");
        title.className = "title-row";
        title.dataset.target = "details-" + idx;

        // LEFT: Title text
        const titleText = document.createElement("span");
        titleText.textContent = entry.Title || "Untitled";

        // RIGHT: Date
        const dateValue = getDisplayDate(entry);
        const dateSpan = document.createElement("span");
        dateSpan.className = "title-date";
        if (dateValue) {
            dateSpan.textContent = dateValue;
        } else {
            dateSpan.textContent = "Unspecified";
            dateSpan.classList.add("unspecified");
}

        // Append both sides
        title.appendChild(titleText);
        title.appendChild(dateSpan);

        // Details (collapsed by default)
        const details = document.createElement("div");
        details.className = "collapse details-box mt-2";
        details.id = "details-" + idx;

        // Build details dynamically
        let detailsHTML = "";
        for (const [key, value] of Object.entries(entry)) {

            if (["Title", "Roman dates", "Reworked date", "DateValue", "DateGroup", "Unnamed: 4", ""].includes(key)) continue;

            if (key === "Numerical dates") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Date(s):</strong> ${value}</div>`;
                continue;
            }

            if (key === "Beginning lines") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Beginning Lines:</strong> <em>${value}</em></div>`;
                continue;
            }

            if (key === "Ascribed/Attributed to …") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Attribution:</strong> ${value}</div>`;
                continue;
            }

            if (key === "Place text was written") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Place Written:</strong> ${value}</div>`;
                continue;
            }

            if (key === "Location of the narrative") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Place Set:</strong> ${value}</div>`;
                continue;
            }

            if (key === "Characters in the narrative") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Characters:</strong> ${value}</div>`;
                continue;
            }

            if (key === "CODECS:") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>CODECS:</strong> <a href="${value}" target="_blank">${value}</a></div>`;
                continue;
            }

            if (key === "info:") {
                if (value === null || value === undefined) continue;
                const strVal = String(value).trim();
                if (strVal.toLowerCase() === "unknown" || strVal === "") continue;
                detailsHTML += `<div><strong>Info:</strong> ${value}</div>`;
                continue;
            }

            detailsHTML += `<div><strong>${key}:</strong> ${value || "Unknown"}</div>`;
        }

        details.innerHTML = detailsHTML;

        // Append to list
        item.appendChild(title);
        item.appendChild(details);
        container.appendChild(item);

        // Click handler
        title.addEventListener("click", () => {
            const box = document.getElementById(title.dataset.target);
            const isOpen = box.classList.contains("show");

            if (isOpen) {
                bootstrap.Collapse.getOrCreateInstance(box).hide();
            } else {
                bootstrap.Collapse.getOrCreateInstance(box).show();
            }
        });
    });

    // Update tab highlight
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.mode === mode);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => renderList(btn.dataset.mode));
    });

    loadData();
});
