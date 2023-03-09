const getScript = document.currentScript;
const lang = getScript.dataset.filename;
let copy_btn = document.querySelector(".copy-tooltip");
function First_call() {
  initializeOptions();
  let toolType = document.querySelector('input[name="tool-type"]').value;
  let actionButton = document.querySelector("button.tool-action-button");
  if (actionButton) {
    actionButton.addEventListener("click", function () {
      performToolAction();
    });
  }
  if (toolType == "generator") {
    performToolAction();
  }
}
function initializeOptions() {
  var toolOptions = document.querySelector(".options-panel");
  if (toolOptions) {
    var inputElements = toolOptions.querySelectorAll("input,select,textarea");
    if (inputElements) {
      for (var i = 0; i < inputElements.length; i++) {
        var inputElement = inputElements[i];
        var inputNodeName = inputElement.nodeName.toLowerCase();
        var inputElementType = inputElement.getAttribute("type");
        if (inputElementType == "text" || inputElementType == "number") {
          inputElement.addEventListener("keyup", function () {
            performToolAction();
          });
          continue;
        }
        if (inputNodeName == "textarea") {
          inputElement.addEventListener("keyup", function () {
            performToolAction();
          });
        }
        if (
          inputElementType == "radio" ||
          inputElementType == "checkbox" ||
          inputNodeName == "select"
        ) {
          inputElement.addEventListener("change", function () {
            performToolAction();
          });
        }
      }
    }
  }
}
const copyToClipboard = (str) => {
  try {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    copy_btn.setAttribute("data-tooltip", "Copied !");
  } catch (error) {
    console.log(error);
  }
};
function performToolAction() {
  let resultArr = [];
  let toolType = document.querySelector('input[name="tool-type"]').value;
  if (toolType == "generator") {
    let outputTextArea = document.querySelector("#result-box");
    let options = getOptions();
    try {
      hideToolMessage();
      generate(options, function (output) {
        copy_btn.addEventListener("click", () => {
          copyToClipboard(output);
        });
        outputTextArea.value = output;
        resultArr.push(output);
      });
    } catch (e) {
      if (e instanceof ToolError) {
        showError(e.title, e.message);
      } else {
        showError("Unexpected Error", e.toString());
      }
      outputTextArea.value = "";
    }
  }
}

String.prototype.format = function () {
  var formatted = this;
  for (var i = 0; i < arguments.length; i++) {
    var regexp = new RegExp("\\{" + i + "\\}", "gi");
    formatted = formatted.replace(regexp, arguments[i]);
  }
  return formatted;
};
function ToolError(title, message) {
  if (!(this instanceof ToolError)) return new ToolError(title, message);
  this.title = title;
  this.message = message;
}
function showError(title, message) {
  showToolMessage("error", title, message);
}
function showToolMessage(type, message) {
  var toolMessage = document.querySelector(".tool-message");
  if (toolMessage) {
    toolMessage.classList.remove("tool-error");
    toolMessage.classList.remove("tool-warning");
    if (type == "error") {
      toolMessage.classList.add("tool-error");
    } else if (type == "warning") {
      toolMessage.classList.add("tool-warning");
    }
    let toolMessageMessage = toolMessage.querySelector(".tool-message-message");
    toolMessageMessage.innerHTML = message;
    toolMessage.style.display = "block";
  }
}
function hideToolMessage() {
  var toolMessage = document.querySelector(".tool-message");
  if (toolMessage) {
    toolMessage.style.display = "none";
  }
}
function getOptions() {
  var toolOptions = document.querySelector(".options-panel");
  if (!toolOptions) {
    return {};
  }
  var optionInputs = toolOptions.querySelectorAll("input,select,textarea");

  if (!optionInputs) {
    return {};
  }
  var options = {};
  for (var i = 0; i < optionInputs.length; i++) {
    var input = optionInputs[i];
    var nodeName = input.nodeName.toLowerCase();
    if (nodeName == "input") {
      var type = input.getAttribute("type");
      if (type == "radio") {
        options[input.dataset.name] = input.checked;
      } else if (type == "checkbox") {
        options[input.name] = input.checked;
      } else {
        options[input.name] = input.value;
      }
    } else if (nodeName == "select") {
      var selectedIndex = input.selectedIndex;
      options[input.name] = input.options[selectedIndex].value;
    } else if (nodeName == "textarea") {
      options[input.name] = input.value;
    }
  }
  return options;
}
function colorchange(col) {
  document.getElementById(col).value = document.getElementById(
    col + "-val"
  ).value;
}