document.addEventListener("DOMContentLoaded", function () {
  console.log("Webflow integration script loaded!");
  // Create form element
  var form = document.createElement("form");
  form.id = "webflow-fauna-db-form";
  form.style.padding = "10px";
  form.style.border = "3px solid #4CAF50";
  form.style.borderRadius = "15px";
  form.style.background = "white";
  form.style.width = "90%";
  form.style.maxWidth = "500px";
  form.style.margin = "20px auto";
  form.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

  // Create input element for text
  var input = document.createElement("input");
  input.type = "text";
  input.id = "webflow-fauna-db-input";
  input.placeholder = "Write something...";
  input.style.width = "calc(100% - 20px)"; // minus padding
  input.style.padding = "10px";
  input.style.margin = "8px 0";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "10px";

  var containerOptions = document.createElement("div");
  containerOptions.style.display = "flex";

  // Create radio buttons for budget options
  var budgetOptions = [
    { id: "budget-low", value: "Low", label: "To low" },
    { id: "budget-mid", value: "Medium", label: "So-so" },
    { id: "budget-high", value: "High", label: "Max" },
  ];

  var budgetLabel = document.createElement("label");
  budgetLabel.textContent = "Budget : ";
  budgetLabel.style.display = "block";
  budgetLabel.style.marginTop = "10px";

  budgetOptions.forEach(function (option, index) {
    var container = document.createElement("div");

    var label = document.createElement("label");
    label.htmlFor = option.id;
    label.textContent = option.label;

    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "budget";
    radio.value = option.value;
    radio.id = option.id;
    radio.style.marginRight = "5px";

    if (index === 0) {
      radio.checked = true;
    }

    container.appendChild(radio);
    container.appendChild(label);
    containerOptions.appendChild(container);
  });

  // Create button element
  var button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Submit";
  button.id = "webflow-fauna-db-btn";
  button.style.padding = "10px 0";
  button.style.width = "100%";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.background = "#4CAF50";
  button.style.color = "white";
  button.style.fontSize = "16px";
  button.style.cursor = "pointer";
  button.style.marginTop = "8px";

  // Append elements to form
  form.appendChild(budgetLabel);
  form.appendChild(containerOptions);
  form.appendChild(input);
  form.appendChild(button);

  // Add the form to the body
  document.body.appendChild(form);

  // Handle form submission here
  form.onsubmit = function (event) {
    event.preventDefault();
    var data = {
      input: input.value,
      budget: document.querySelector('input[name="budget"]:checked').value,
    };

    fetch("/.netlify/functions/mkl-handler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        input.value = "";
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error! Check console for more details.");
      });
  };
});
