class CSVProcessor {
  process() {}
  validateInput() {}
}

class JSONProcessor {
  process() {}
  validateInput() {}
}

const process = function (processor, input) {
  if (
    typeof processor.validateInput === "function" &&
    typeof processor.process === "function"
  ) {
    const isInputValid = processor.validateInput(input);
    if (isInputValid) {
      return processor.process(input);
    }
  } else {
    throw new Error("Invalid processor");
  }
};
