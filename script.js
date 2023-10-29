function columnarTranspositionEncrypt(text, key) {
  const numCols = key.length;
  const numRows = Math.ceil(text.length / numCols);
  const matrix = new Array(numRows).fill().map(() => new Array(numCols));

  let index = 0;

  // Define the order of columns based on the key
  const columnOrder = key.split("").map((char) => parseInt(char));

  for (let col = 1; col <= numCols; col++) {
    const colIndex = col - 1;
    for (let row = 0; row < numRows; row++) {
      if (index < text.length) {
        matrix[row][colIndex] = text.charAt(index);
        index++;
      } else {
        matrix[row][colIndex] = "$"; // Fill remaining spaces with $
      }
    }
  }

  let cipherText = "";

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (matrix[row][col] !== "$") {
        cipherText += matrix[row][col];
      }
    }
  }

  return cipherText;
}

document
  .getElementById("encrypt-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const originalText = document.getElementById("original-text").value;
    const encryptionKey = document.getElementById("encryption-key").value;

    const cipherText = columnarTranspositionEncrypt(
      originalText,
      encryptionKey
    );

    // Display the results in the result.html page
    localStorage.setItem("originalText", originalText);
    localStorage.setItem("encryptionKey", encryptionKey);
    localStorage.setItem("cipherText", cipherText);

    window.location.href = "result.html";
  });
