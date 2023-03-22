<?php

$servername = "us-east.connect.psdb.cloud";
$username = "kprjnlm7d54m3af8vr9a";
$password = "pscale_pw_eB86HCy2T9DHHT8GfZquXTg39w9zpUP1IiPnbfRWEFI";
$dbname = "medidores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the values from the form
  $medidor = $_POST["medidor"];
  $coordenadas = $_POST["coordenadas"];

  // Prepare and bind the SQL statement
  $stmt = $conn->prepare("INSERT INTO medidores (medidor, coordenadas) VALUES (?, ?)");
  $stmt->bind_param("ss", $medidor, $coordenadas);

  // Execute the statement and check if it was successful
  if ($stmt->execute() === TRUE) {
    echo "Medidor agregado correctamente";
  } else {
    echo "Error: " . $stmt->error;
  }

  // Close the statement and the database connection
  $stmt->close();
  $conn->close();
}

?>
