window.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");

  function success(response, responseType) {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Thanks! Contact form is submitted successfully.";
  }

  function error(responseStatus, response, responseType) {
    status.innerHTML = response.error;
  }

  // handle the form submission event
  if (!!form) {
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  }
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(JSON.parse(xhr.response), xhr.responseType);
    } else {
      error(xhr.status, JSON.parse(xhr.response), xhr.responseType);
    }
  };
  xhr.send(data);
}
