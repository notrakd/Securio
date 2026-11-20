class Message {
    #sender;
    #text;
    #isPhishing;
    #explanation;

    constructor(sender, text, isPhishing, explanation) {
        this.#sender = sender;
        this.#text = text;
        this.#isPhishing = isPhishing;
        this.#explanation = explanation;
    }

    get IsPhishing() {
        return this.#isPhishing;
    }

    get Explanation() {
        return this.#explanation;
    }

    getType() {
        return "Сообщение";
    }

    render() {
        let div = document.createElement("div");
        div.classList.add("message");
        div.innerHTML = `<p class="message-type">[ ${this.getType()} ] ${this.#sender}</p><p class="message-text">${this.#text}</p>`;
        return div;
    }
}

class EmailMessage extends Message {
    getType() {
        return "Письмо";
    }
}

class SmsMessage extends Message {
    getType() {
        return "SMS";
    }
}

class ChatMessage extends Message {
    getType() {
        return "Мессенджер";
    }
}

class PhishingTrainer {
    #root;
    #messages;
    #index = 0;
    #score = 0;

    constructor(root, messages) {
        this.#root = root;
        this.#messages = messages;
    }

    createButton(text, onClick) {
        let button = document.createElement("button");
        button.classList.add("button");
        button.innerText = text;
        button.addEventListener("click", onClick);
        this.#root.append(button);
    }

    start() {
        this.#index = 0;
        this.#score = 0;
        this.showMessage();
    }

    showMessage() {
        let message = this.#messages[this.#index];

        this.#root.innerHTML = `<p class="trainer-counter">> Сообщение ${this.#index + 1} из ${this.#messages.length}</p>`;
        this.#root.append(message.render());

        this.createButton("НАСТОЯЩЕЕ", function () {
            trainer.answer(false);
        });
        this.createButton("ФИШИНГ", function () {
            trainer.answer(true);
        });
    }

    answer(userSaysPhishing) {
        let trainer = this;
        let message = this.#messages[this.#index];
        let result = "[X] Ошибка!";

        if (userSaysPhishing === message.IsPhishing) {
            this.#score++;
            result = "[OK] Верно!";
        }

        for (const button of this.#root.querySelectorAll("button")) {
            button.remove();
        }

        let feedback = document.createElement("div");
        feedback.classList.add("feedback");
        feedback.innerHTML = `<p class="feedback-result">${result}</p><p class="feedback-explanation">${message.Explanation}</p>`;
        this.#root.append(feedback);

        this.createButton("Дальше →", function () {
            trainer.next();
        });
    }

    next() {
        this.#index++;
        if (this.#index < this.#messages.length) {
            this.showMessage();
        } else {
            this.showResult();
        }
    }

    showResult() {
        let trainer = this;
        this.#root.innerHTML = `<p class="trainer-result">> Результат: ${this.#score} из ${this.#messages.length}</p>`;

        this.createButton("Пройти ещё раз", function () {
            trainer.start();
        });
    }
}

let messages = [
    new SmsMessage("+380 67 ***-**-41",
        "Привет, это Саша! Тебе пришёл код, я случайно ввёл твой номер. Скинь его, очень срочно!",
        true, "Фишинг: просят код из SMS и торопят. Код нельзя сообщать никому."),
    new EmailMessage("no-reply@accounts.google.com",
        "В ваш аккаунт выполнен вход с нового устройства. Если это были не вы, проверьте настройки аккаунта.",
        false, "Настоящее: адрес google.com, нет ссылок и просьб ввести пароль."),
    new ChatMessage("FreeNitro_Bot",
        "Тебе подарили Discord Nitro! Забери до конца дня: discord-gifts.net/claim",
        true, "Фишинг: «подарок» от незнакомца, срочность и поддельный адрес вместо discord.com."),
    new ChatMessage("Мама",
        "Не забудь, в 17:00 тренировка. Ужин в холодильнике.",
        false, "Настоящее: знакомый контакт, нет ссылок, просьб о деньгах или кодах."),
    new SmsMessage("+380 93 ***-**-07",
        "Вы выиграли iPhone! Оплатите доставку 150 грн: bit.ly/prize-iphone",
        true, "Фишинг: «ты выиграл», просят деньги и дают сокращённую ссылку.")
];

let trainer = new PhishingTrainer(document.querySelector("#trainer-root"), messages);
trainer.start();
