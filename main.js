class StudentCard {
    #name;
    #age;
    #faculty;
    #year;
    #photo;

    constructor(name, age, faculty, year, photo) {
        this.Name = name;
        this.Age = age;
        this.Faculty = faculty;
        this.Year = year;
        this.Photo = photo;
    }

    get Name() {
        return this.#name;
    }

    set Name(value) {
        if (value) {
            this.#name = value;
        } else {
            this.#name = "Name error";
        }
    }

    get Age() {
        return this.#age;
    }

    set Age(value) {
        if (typeof value === "number" && value > 0) {
            this.#age = value;
        } else {
            this.#age = 18;
        }
    }

    get Faculty() {
        return this.#faculty;
    }

    set Faculty(value) {
        if (value) {
            this.#faculty = value;
        } else {
            this.#faculty = "Faculty error";
        }
    }

    get Year() {
        return this.#year;
    }

    set Year(value) {
        if (typeof value === "number" && value >= 1) {
            this.#year = value;
        } else {
            this.#year = 1;
        }
    }

    get Photo() {
        return this.#photo;
    }

    set Photo(value) {
        if (value) {
            this.#photo = value;
        } else {
            this.#photo = "image.png";
        }
    }

    introduce() {
        console.log(`Student ${this.#name}, ${this.#age} years old, faculty ${this.#faculty}, year ${this.#year}.`);
    }

    updateYear() {
        this.Year = this.#year + 1;
        console.log(`Students course ${this.#name} updated to: ${this.#year}`);
        this.render();
        this.graduate();
    }

    graduate() {
        if (this.#year > 4) {
            console.log(`Student ${this.#name} has graduated.`);
        }
    }

    render() {
        const photoEl = document.getElementById("student-photo");
        const nameEl = document.getElementById("student-name");
        const ageEl = document.getElementById("student-age");
        const facultyEl = document.getElementById("student-faculty");
        const yearEl = document.getElementById("student-year");

        if (photoEl) photoEl.src = this.Photo;
        if (nameEl) nameEl.textContent = this.Name;
        if (ageEl) ageEl.textContent = this.Age;
        if (facultyEl) facultyEl.textContent = this.Faculty;
        if (yearEl) yearEl.textContent = this.Year;
    }
}

const student = new StudentCard("Alex", 17, "IT", 2);
student.render();