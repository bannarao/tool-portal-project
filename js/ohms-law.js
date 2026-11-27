// Ohm's Law calculator.
// The student enters any two of voltage (V), current (I), resistance (R)
// and power (P). The page works out the other two and shows its working.
(function () {
  var QUANTITIES = {
    V: { name: "Voltage", unit: "V" },
    I: { name: "Current", unit: "A" },
    R: { name: "Resistance", unit: "Ω" },
    P: { name: "Power", unit: "W" }
  };
  var ORDER = ["V", "I", "R", "P"];

  // For each pair of known values (letters in ORDER), the two values to work out.
  // "formula" is what the student sees; "calc" does the maths from the known values.
  var RULES = {
    VI: [
      { target: "R", formula: "V ÷ I", calc: function (k) { return k.V / k.I; } },
      { target: "P", formula: "V × I", calc: function (k) { return k.V * k.I; } }
    ],
    VR: [
      { target: "I", formula: "V ÷ R", calc: function (k) { return k.V / k.R; } },
      { target: "P", formula: "V² ÷ R", calc: function (k) { return (k.V * k.V) / k.R; } }
    ],
    VP: [
      { target: "I", formula: "P ÷ V", calc: function (k) { return k.P / k.V; } },
      { target: "R", formula: "V² ÷ P", calc: function (k) { return (k.V * k.V) / k.P; } }
    ],
    IR: [
      { target: "V", formula: "I × R", calc: function (k) { return k.I * k.R; } },
      { target: "P", formula: "I² × R", calc: function (k) { return k.I * k.I * k.R; } }
    ],
    IP: [
      { target: "V", formula: "P ÷ I", calc: function (k) { return k.P / k.I; } },
      { target: "R", formula: "P ÷ I²", calc: function (k) { return k.P / (k.I * k.I); } }
    ],
    RP: [
      { target: "V", formula: "√(P × R)", calc: function (k) { return Math.sqrt(k.P * k.R); } },
      { target: "I", formula: "√(P ÷ R)", calc: function (k) { return Math.sqrt(k.P / k.R); } }
    ]
  };

  // A plain decimal number such as 12, 0.5, .5 or 1e3.
  var NUMBER_PATTERN = /^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i;

  var form = document.getElementById("ohms-form");
  var message = document.getElementById("message");
  var results = document.getElementById("results");
  var valuesList = document.getElementById("values");
  var workingList = document.getElementById("working");
  var clearButton = document.getElementById("clear");
  var inputs = {};
  ORDER.forEach(function (key) {
    inputs[key] = document.getElementById("field-" + key);
  });

  // 4 significant digits, trailing zeros dropped (3.250 -> "3.25").
  function format(n) {
    return String(Number(n.toPrecision(4)));
  }

  function showMessage(text, isError) {
    message.textContent = text;
    message.className = "message" + (isError ? " error" : "");
  }

  function fail(text, badKeys) {
    results.hidden = true;
    showMessage(text, true);
    (badKeys || []).forEach(function (key) {
      inputs[key].setAttribute("aria-invalid", "true");
    });
    if (badKeys && badKeys.length) inputs[badKeys[0]].focus();
  }

  function addItem(list, text) {
    var li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  }

  function calculate() {
    var known = {};
    var badKeys = [];
    var filled = 0;

    ORDER.forEach(function (key) {
      inputs[key].removeAttribute("aria-invalid");
      var text = inputs[key].value.trim();
      if (text === "") return;
      filled++;
      var number = NUMBER_PATTERN.test(text) ? Number(text) : NaN;
      if (isFinite(number) && number > 0) {
        known[key] = number;
      } else {
        badKeys.push(key);
      }
    });

    if (filled !== 2) {
      fail("Fill in exactly two of the four fields (you have filled in " + filled + ").");
      return;
    }

    if (badKeys.length) {
      var names = badKeys.map(function (key) { return QUANTITIES[key].name; });
      fail(names.join(" and ") + (names.length > 1 ? " need" : " needs") +
        " to be a number greater than zero, for example 12 or 0.5.", badKeys);
      return;
    }

    var pair = ORDER.filter(function (key) { return key in known; }).join("");
    var all = {};
    ORDER.forEach(function (key) { if (key in known) all[key] = known[key]; });
    var working = [];

    for (var i = 0; i < RULES[pair].length; i++) {
      var rule = RULES[pair][i];
      var value = rule.calc(known);
      if (!isFinite(value) || value === 0) {
        fail("Those numbers are too large or too small for the result to be shown. Try smaller or larger values.");
        return;
      }
      all[rule.target] = value;
      var substituted = rule.formula.replace(/[VIRP]/g, function (letter) {
        return format(known[letter]);
      });
      working.push(rule.target + " = " + rule.formula + " = " + substituted +
        " = " + format(value) + " " + QUANTITIES[rule.target].unit);
    }

    valuesList.textContent = "";
    ORDER.forEach(function (key) {
      var q = QUANTITIES[key];
      addItem(valuesList, q.name + " (" + key + "): " + format(all[key]) + " " + q.unit +
        (key in known ? " — you entered this" : " — calculated"));
    });
    workingList.textContent = "";
    working.forEach(function (line) { addItem(workingList, line); });

    results.hidden = false;
    showMessage("Done. The results are shown below.", false);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });

  clearButton.addEventListener("click", function () {
    form.reset();
    ORDER.forEach(function (key) { inputs[key].removeAttribute("aria-invalid"); });
    results.hidden = true;
    showMessage("", false);
    inputs.V.focus();
  });
})();
