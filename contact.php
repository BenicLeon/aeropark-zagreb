<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Provjera i sanitizacija unosa
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Provjera obavezna polja
    if (empty($name) || empty($email) || empty($message)) {
        echo "Molimo ispunite sva polja.";
        exit;
    }

    // Provjera ispravnosti e-mail adrese
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Molimo unesite ispravnu e-mail adresu.";
        exit;
    }

    // Slanje e-maila
    $to = "info@aeroparkzagreb.com";
    $subject = "Poruka sa kontakt forme";
    $body = "Ime: $name\nEmail: $email\nPoruka: $message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        header("Location: index.html");
    } else {
        echo "Došlo je do problema prilikom slanja poruke.";
    }
} else {
    // Ako pokušate pristupiti skripti izravno, redirektirajte na početnu stranicu
    header("Location: index.html");
    exit;
}
?>