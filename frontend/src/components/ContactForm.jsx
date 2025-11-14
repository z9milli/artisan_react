import React from "react";

function ContactForm() {
  return (
    <div className="Contact">
      <form name="contact" method="post">
        <label>
          Nom <input type="text" name="name" />
        </label>

        <label>
          Email <input type="email" name="email" />
        </label>

        <label>
          Objet <input type="objet" name="objet" />
        </label>

        <label>
          Message <textarea name="message"></textarea>
        </label>

        <button type="submit">Envoyer</button>
      </form>

    </div>
  );
}

export default ContactForm;
